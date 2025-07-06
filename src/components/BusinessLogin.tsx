import React, { useState } from 'react';
import { Store, X, User, Lock, Eye, EyeOff, Building, MapPin, Phone, Mail, Globe, Users, DollarSign, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BusinessData {
  // Datos básicos
  nombre_negocio: string;
  tipo_negocio: string;
  direccion: string;
  telefono: string;
  email: string;
  sitio_web: string;
  
  // Datos operativos
  horario_apertura: string;
  horario_cierre: string;
  dias_operacion: string[];
  cantidad_empleados: string;
  ventas_promedio: string;
  clientes_promedio: string;
  
  // Datos de marketing
  instagram: string;
  facebook: string;
  whatsapp: string;
  
  // Objetivos
  objetivo_principal: string;
  presupuesto_marketing: string;
}

interface BusinessLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessLogin: React.FC<BusinessLoginProps> = ({ isOpen, onClose }) => {
  const { user, signIn, signUp, createBusiness, currentBusiness } = useAuth();
  const [currentStep, setCurrentStep] = useState<'login' | 'register' | 'business-form' | 'dashboard'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [businessData, setBusinessData] = useState<BusinessData>({
    nombre_negocio: '',
    tipo_negocio: '',
    direccion: '',
    telefono: '',
    email: '',
    sitio_web: '',
    horario_apertura: '',
    horario_cierre: '',
    dias_operacion: [],
    cantidad_empleados: '',
    ventas_promedio: '',
    clientes_promedio: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    objetivo_principal: '',
    presupuesto_marketing: ''
  });

  const [formStep, setFormStep] = useState(1);

  // Verificar si el usuario ya está logueado y tiene negocio
  React.useEffect(() => {
    if (user && currentBusiness) {
      setCurrentStep('dashboard');
    } else if (user && !currentBusiness) {
      setCurrentStep('business-form');
    }
  }, [user, currentBusiness]);

  const tiposNegocio = [
    'Restaurante/Gastronomía',
    'Tienda de Ropa/Moda',
    'Ferretería/Construcción',
    'Farmacia/Salud',
    'Tecnología/Electrónicos',
    'Belleza/Estética',
    'Autopartes/Automotor',
    'Supermercado/Almacén',
    'Servicios Profesionales',
    'Otro'
  ];

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const objetivos = [
    'Aumentar ventas online',
    'Mejorar presencia en redes sociales',
    'Automatizar procesos',
    'Analizar competencia',
    'Generar más leads',
    'Optimizar horarios de atención',
    'Crear contenido automático',
    'Mejorar atención al cliente'
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        setError(error.message);
      } else {
        // El useEffect se encargará de cambiar el step
      }
    } catch (err) {
      setError('Error inesperado al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(registerData.email, registerData.password, registerData.nombre);
      
      if (error) {
        setError(error.message);
      } else {
        setCurrentStep('business-form');
      }
    } catch (err) {
      setError('Error inesperado al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessDataChange = (field: string, value: string | string[]) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDayToggle = (day: string) => {
    const currentDays = businessData.dias_operacion;
    if (currentDays.includes(day)) {
      handleBusinessDataChange('dias_operacion', currentDays.filter(d => d !== day));
    } else {
      handleBusinessDataChange('dias_operacion', [...currentDays, day]);
    }
  };

  const handleBusinessFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 4) {
      setFormStep(formStep + 1);
    } else {
      setLoading(true);
      setError(null);

      try {
        await createBusiness({
          ...businessData,
          clientes_promedio: parseInt(businessData.clientes_promedio) || 0
        });
        setCurrentStep('dashboard');
      } catch (err) {
        setError('Error al crear el negocio');
      } finally {
        setLoading(false);
      }
    }
  };

  const renderLoginForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-mono">Acceso a Mi Negocio</h2>
        <p className="text-gray-400 mt-2">Gestiona tu negocio con herramientas inteligentes</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">Email</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              placeholder="Tu contraseña"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all"
        >
          {loading ? 'Ingresando...' : 'Ingresar a Mi Negocio'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => setCurrentStep('register')}
            className="text-teal-500 hover:text-teal-400 font-medium"
            disabled={loading}
          >
            Registrar mi negocio
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-mono">Registrar Mi Negocio</h2>
        <p className="text-gray-400 mt-2">Crea tu cuenta para acceder a todas las herramientas</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">Nombre Completo</label>
          <input
            type="text"
            value={registerData.nombre}
            onChange={(e) => setRegisterData(prev => ({ ...prev, nombre: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="Tu nombre completo"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Email</label>
          <input
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="tu@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={registerData.password}
            onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="Mínimo 6 caracteres"
            required
            minLength={6}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="Repite tu contraseña"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all"
        >
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => setCurrentStep('login')}
            className="text-teal-500 hover:text-teal-400 font-medium"
            disabled={loading}
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );

  // ... resto de los métodos render (renderBusinessForm, renderDashboard) permanecen igual
  // pero agregando disabled={loading} a los botones y campos de entrada

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="font-bold font-mono">Mi Negocio</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {currentStep === 'login' && renderLoginForm()}
          {currentStep === 'register' && renderRegisterForm()}
          {/* Agregar renderBusinessForm y renderDashboard aquí */}
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;