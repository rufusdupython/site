import React, { useState } from 'react';
import { Store, X, User, Lock, Eye, EyeOff, Building, MapPin, Phone, Mail, Globe, Users, DollarSign, Calendar } from 'lucide-react';

interface BusinessData {
  // Datos básicos
  nombreNegocio: string;
  tipoNegocio: string;
  direccion: string;
  telefono: string;
  email: string;
  sitioWeb: string;
  
  // Datos operativos
  horarioApertura: string;
  horarioCierre: string;
  diasOperacion: string[];
  cantidadEmpleados: string;
  ventasPromedio: string;
  clientesPromedio: string;
  
  // Datos de marketing
  redesSociales: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  
  // Objetivos
  objetivoPrincipal: string;
  presupuestoMarketing: string;
}

interface BusinessLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessLogin: React.FC<BusinessLoginProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'login' | 'register' | 'business-form' | 'dashboard'>('login');
  const [showPassword, setShowPassword] = useState(false);
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
    nombreNegocio: '',
    tipoNegocio: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    horarioApertura: '',
    horarioCierre: '',
    diasOperacion: [],
    cantidadEmpleados: '',
    ventasPromedio: '',
    clientesPromedio: '',
    redesSociales: {
      instagram: '',
      facebook: '',
      whatsapp: ''
    },
    objetivoPrincipal: '',
    presupuestoMarketing: ''
  });

  const [formStep, setFormStep] = useState(1);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login exitoso
    setCurrentStep('dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setCurrentStep('business-form');
  };

  const handleBusinessDataChange = (field: string, value: string | string[]) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBusinessData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BusinessData],
          [child]: value
        }
      }));
    } else {
      setBusinessData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleDayToggle = (day: string) => {
    const currentDays = businessData.diasOperacion;
    if (currentDays.includes(day)) {
      handleBusinessDataChange('diasOperacion', currentDays.filter(d => d !== day));
    } else {
      handleBusinessDataChange('diasOperacion', [...currentDays, day]);
    }
  };

  const handleBusinessFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 4) {
      setFormStep(formStep + 1);
    } else {
      // Guardar datos y ir al dashboard
      setCurrentStep('dashboard');
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all"
        >
          Ingresar a Mi Negocio
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => setCurrentStep('register')}
            className="text-teal-500 hover:text-teal-400 font-medium"
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => setCurrentStep('login')}
            className="text-teal-500 hover:text-teal-400 font-medium"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );

  const renderBusinessForm = () => {
    const renderStep1 = () => (
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-mono mb-4">Información Básica</h3>
        
        <div>
          <label className="block text-gray-300 font-medium mb-2">Nombre del Negocio</label>
          <input
            type="text"
            value={businessData.nombreNegocio}
            onChange={(e) => handleBusinessDataChange('nombreNegocio', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="Ej: Panadería San Martín"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Tipo de Negocio</label>
          <select
            value={businessData.tipoNegocio}
            onChange={(e) => handleBusinessDataChange('tipoNegocio', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          >
            <option value="">Selecciona tu rubro</option>
            {tiposNegocio.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Dirección</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={businessData.direccion}
              onChange={(e) => handleBusinessDataChange('direccion', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              placeholder="Calle 123, Campana, Buenos Aires"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={businessData.telefono}
                onChange={(e) => handleBusinessDataChange('telefono', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
                placeholder="11 1234-5678"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Email del Negocio</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={businessData.email}
                onChange={(e) => handleBusinessDataChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
                placeholder="info@tunegocio.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Sitio Web (opcional)</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={businessData.sitioWeb}
              onChange={(e) => handleBusinessDataChange('sitioWeb', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              placeholder="https://www.tunegocio.com"
            />
          </div>
        </div>
      </div>
    );

    const renderStep2 = () => (
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-mono mb-4">Horarios y Operación</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Horario de Apertura</label>
            <input
              type="time"
              value={businessData.horarioApertura}
              onChange={(e) => handleBusinessDataChange('horarioApertura', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Horario de Cierre</label>
            <input
              type="time"
              value={businessData.horarioCierre}
              onChange={(e) => handleBusinessDataChange('horarioCierre', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Días de Operación</label>
          <div className="grid grid-cols-2 gap-2">
            {diasSemana.map(dia => (
              <label key={dia} className="flex items-center">
                <input
                  type="checkbox"
                  checked={businessData.diasOperacion.includes(dia)}
                  onChange={() => handleDayToggle(dia)}
                  className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-300">{dia}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Cantidad de Empleados</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={businessData.cantidadEmpleados}
                onChange={(e) => handleBusinessDataChange('cantidadEmpleados', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
                required
              >
                <option value="">Seleccionar</option>
                <option value="1">Solo yo</option>
                <option value="2-5">2-5 empleados</option>
                <option value="6-10">6-10 empleados</option>
                <option value="11-20">11-20 empleados</option>
                <option value="20+">Más de 20</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Ventas Promedio Mensual</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={businessData.ventasPromedio}
                onChange={(e) => handleBusinessDataChange('ventasPromedio', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
                required
              >
                <option value="">Seleccionar</option>
                <option value="0-100k">$0 - $100.000</option>
                <option value="100k-500k">$100.000 - $500.000</option>
                <option value="500k-1M">$500.000 - $1.000.000</option>
                <option value="1M-5M">$1.000.000 - $5.000.000</option>
                <option value="5M+">Más de $5.000.000</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Clientes Promedio por Día</label>
          <input
            type="number"
            value={businessData.clientesPromedio}
            onChange={(e) => handleBusinessDataChange('clientesPromedio', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="Ej: 50"
            min="0"
          />
        </div>
      </div>
    );

    const renderStep3 = () => (
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-mono mb-4">Presencia Digital</h3>
        
        <div>
          <label className="block text-gray-300 font-medium mb-2">Instagram</label>
          <input
            type="text"
            value={businessData.redesSociales.instagram}
            onChange={(e) => handleBusinessDataChange('redesSociales.instagram', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="@tunegocio"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Facebook</label>
          <input
            type="text"
            value={businessData.redesSociales.facebook}
            onChange={(e) => handleBusinessDataChange('redesSociales.facebook', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="facebook.com/tunegocio"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">WhatsApp Business</label>
          <input
            type="tel"
            value={businessData.redesSociales.whatsapp}
            onChange={(e) => handleBusinessDataChange('redesSociales.whatsapp', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            placeholder="11 1234-5678"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Objetivo Principal</label>
          <select
            value={businessData.objetivoPrincipal}
            onChange={(e) => handleBusinessDataChange('objetivoPrincipal', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          >
            <option value="">¿Qué quieres lograr?</option>
            {objetivos.map(objetivo => (
              <option key={objetivo} value={objetivo}>{objetivo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Presupuesto Mensual para Marketing</label>
          <select
            value={businessData.presupuestoMarketing}
            onChange={(e) => handleBusinessDataChange('presupuestoMarketing', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
            required
          >
            <option value="">Seleccionar presupuesto</option>
            <option value="0-10k">$0 - $10.000</option>
            <option value="10k-25k">$10.000 - $25.000</option>
            <option value="25k-50k">$25.000 - $50.000</option>
            <option value="50k-100k">$50.000 - $100.000</option>
            <option value="100k+">Más de $100.000</option>
          </select>
        </div>
      </div>
    );

    const renderStep4 = () => (
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-mono mb-4">Resumen de tu Negocio</h3>
        
        <div className="bg-slate-800 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-teal-500">Negocio</h4>
              <p className="text-gray-300">{businessData.nombreNegocio}</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-500">Tipo</h4>
              <p className="text-gray-300">{businessData.tipoNegocio}</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-500">Horario</h4>
              <p className="text-gray-300">{businessData.horarioApertura} - {businessData.horarioCierre}</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-500">Empleados</h4>
              <p className="text-gray-300">{businessData.cantidadEmpleados}</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-500">Ventas Mensuales</h4>
              <p className="text-gray-300">{businessData.ventasPromedio}</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-500">Objetivo</h4>
              <p className="text-gray-300">{businessData.objetivoPrincipal}</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500/20 p-4 rounded-lg border border-teal-500/30">
          <h4 className="font-bold text-teal-500 mb-2">🎯 Recomendaciones Personalizadas</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Plan Growth recomendado para tu tipo de negocio</li>
            <li>• Bot analista configurado para {businessData.tipoNegocio}</li>
            <li>• Horarios óptimos de publicación identificados</li>
            <li>• Estrategia de contenido personalizada</li>
          </ul>
        </div>
      </div>
    );

    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-mono">Configurar Mi Negocio</h2>
          <p className="text-gray-400 mt-2">Paso {formStep} de 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= formStep ? 'bg-teal-500 text-slate-900' : 'bg-slate-700 text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(formStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleBusinessFormSubmit}>
          {formStep === 1 && renderStep1()}
          {formStep === 2 && renderStep2()}
          {formStep === 3 && renderStep3()}
          {formStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8">
            {formStep > 1 && (
              <button
                type="button"
                onClick={() => setFormStep(formStep - 1)}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded transition-all"
              >
                Anterior
              </button>
            )}
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all ml-auto"
            >
              {formStep === 4 ? 'Finalizar Configuración' : 'Siguiente'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold font-mono">{businessData.nombreNegocio || 'Mi Negocio'}</h2>
        <p className="text-gray-400 mt-2">Panel de Control</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="font-bold text-teal-500 mb-2">Análisis Rápido</h3>
          <p className="text-gray-300 text-sm">Basado en tu información, detectamos 3 oportunidades de mejora</p>
          <button className="mt-2 text-teal-500 text-sm hover:text-teal-400">Ver detalles →</button>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="font-bold text-indigo-500 mb-2">Bot Analista</h3>
          <p className="text-gray-300 text-sm">Configurado para {businessData.tipoNegocio}</p>
          <button className="mt-2 text-indigo-500 text-sm hover:text-indigo-400">Chatear →</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold font-mono">Herramientas Disponibles</h3>
        
        <div className="grid gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg text-left transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Generador de Contenido</h4>
                <p className="text-gray-400 text-sm">Crea posts para {businessData.tipoNegocio}</p>
              </div>
              <div className="text-teal-500">→</div>
            </div>
          </button>

          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg text-left transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Análisis de Competencia</h4>
                <p className="text-gray-400 text-sm">Competidores en tu zona</p>
              </div>
              <div className="text-indigo-500">→</div>
            </div>
          </button>

          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg text-left transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Calendario de Publicaciones</h4>
                <p className="text-gray-400 text-sm">Horarios óptimos para tu negocio</p>
              </div>
              <div className="text-amber-500">→</div>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <button
          onClick={() => {
            setCurrentStep('login');
            setFormStep(1);
            setBusinessData({
              nombreNegocio: '',
              tipoNegocio: '',
              direccion: '',
              telefono: '',
              email: '',
              sitioWeb: '',
              horarioApertura: '',
              horarioCierre: '',
              diasOperacion: [],
              cantidadEmpleados: '',
              ventasPromedio: '',
              clientesPromedio: '',
              redesSociales: {
                instagram: '',
                facebook: '',
                whatsapp: ''
              },
              objetivoPrincipal: '',
              presupuestoMarketing: ''
            });
          }}
          className="text-gray-400 hover:text-white text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

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
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {currentStep === 'login' && renderLoginForm()}
          {currentStep === 'register' && renderRegisterForm()}
          {currentStep === 'business-form' && renderBusinessForm()}
          {currentStep === 'dashboard' && renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;