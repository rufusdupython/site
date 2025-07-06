import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Tipos TypeScript para la base de datos
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  nombre_negocio: string;
  tipo_negocio: string;
  direccion: string;
  telefono: string;
  email?: string;
  sitio_web?: string;
  horario_apertura?: string;
  horario_cierre?: string;
  dias_operacion: string[];
  cantidad_empleados?: string;
  ventas_promedio?: string;
  clientes_promedio: number;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  objetivo_principal?: string;
  presupuesto_marketing?: string;
  plan_activo: string;
  plan_expira_en?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface BusinessAnalytics {
  id: string;
  business_id: string;
  fecha: string;
  visitas_web: number;
  conversiones: number;
  ventas_dia: number;
  clientes_nuevos: number;
  engagement_redes: number;
  ctr_anuncios: number;
  created_at: string;
}

export interface ContentGenerated {
  id: string;
  business_id: string;
  tipo_contenido: string;
  plataforma: string;
  titulo?: string;
  contenido: string;
  hashtags: string[];
  imagen_url?: string;
  programado_para?: string;
  publicado: boolean;
  engagement_obtenido: number;
  created_at: string;
}

export interface ChatConversation {
  id: string;
  business_id: string;
  mensaje_usuario: string;
  respuesta_bot: string;
  contexto: Record<string, any>;
  satisfaccion?: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  business_id: string;
  plan: string;
  estado: string;
  precio_mensual: number;
  fecha_inicio: string;
  fecha_fin?: string;
  payment_id?: string;
  created_at: string;
  updated_at: string;
}