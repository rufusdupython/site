/*
  # Esquema inicial para Mutante.web

  1. Tablas principales
    - `profiles` - Perfiles de usuario
    - `businesses` - Información de negocios
    - `business_analytics` - Métricas y analytics
    - `content_generated` - Contenido generado por IA
    - `chat_conversations` - Conversaciones con el bot
    - `subscriptions` - Suscripciones y planes

  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas de acceso por usuario
    - Triggers para timestamps automáticos
*/

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de negocios
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nombre_negocio text NOT NULL,
  tipo_negocio text NOT NULL,
  direccion text NOT NULL,
  telefono text NOT NULL,
  email text,
  sitio_web text,
  horario_apertura time,
  horario_cierre time,
  dias_operacion text[] DEFAULT '{}',
  cantidad_empleados text,
  ventas_promedio text,
  clientes_promedio integer DEFAULT 0,
  instagram text,
  facebook text,
  whatsapp text,
  objetivo_principal text,
  presupuesto_marketing text,
  plan_activo text DEFAULT 'starter',
  plan_expira_en timestamptz,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de analytics del negocio
CREATE TABLE IF NOT EXISTS business_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  fecha date DEFAULT CURRENT_DATE,
  visitas_web integer DEFAULT 0,
  conversiones integer DEFAULT 0,
  ventas_dia numeric DEFAULT 0,
  clientes_nuevos integer DEFAULT 0,
  engagement_redes numeric DEFAULT 0,
  ctr_anuncios numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabla de contenido generado
CREATE TABLE IF NOT EXISTS content_generated (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  tipo_contenido text NOT NULL, -- 'post', 'story', 'reel', 'email'
  plataforma text NOT NULL, -- 'instagram', 'facebook', 'email'
  titulo text,
  contenido text NOT NULL,
  hashtags text[],
  imagen_url text,
  programado_para timestamptz,
  publicado boolean DEFAULT false,
  engagement_obtenido numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabla de conversaciones del chat
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  mensaje_usuario text NOT NULL,
  respuesta_bot text NOT NULL,
  contexto jsonb DEFAULT '{}',
  satisfaccion integer, -- 1-5 rating
  created_at timestamptz DEFAULT now()
);

-- Tabla de suscripciones
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL, -- 'starter', 'growth', 'enterprise'
  estado text DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  precio_mensual numeric NOT NULL,
  fecha_inicio timestamptz DEFAULT now(),
  fecha_fin timestamptz,
  payment_id text, -- ID del pago en MercadoPago/Stripe
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de métricas del sistema
CREATE TABLE IF NOT EXISTS system_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  fecha date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generated ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Políticas para businesses
CREATE POLICY "Users can read own businesses"
  ON businesses
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own businesses"
  ON businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own businesses"
  ON businesses
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Políticas para business_analytics
CREATE POLICY "Users can read own business analytics"
  ON business_analytics
  FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own business analytics"
  ON business_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Políticas para content_generated
CREATE POLICY "Users can manage own content"
  ON content_generated
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Políticas para chat_conversations
CREATE POLICY "Users can manage own conversations"
  ON chat_conversations
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Políticas para subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil cuando se registra un usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_business_analytics_business_id ON business_analytics(business_id);
CREATE INDEX IF NOT EXISTS idx_business_analytics_fecha ON business_analytics(fecha);
CREATE INDEX IF NOT EXISTS idx_content_generated_business_id ON content_generated(business_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_business_id ON chat_conversations(business_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_business_id ON subscriptions(business_id);