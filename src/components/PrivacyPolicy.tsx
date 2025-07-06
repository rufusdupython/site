import React, { useState } from 'react';
import { Shield, X, FileText, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('introduccion');

  const sections = [
    { id: 'introduccion', title: 'Introducción', icon: FileText },
    { id: 'datos-recopilados', title: 'Datos que Recopilamos', icon: Database },
    { id: 'uso-datos', title: 'Uso de los Datos', icon: Eye },
    { id: 'proteccion', title: 'Protección de Datos', icon: Lock },
    { id: 'derechos', title: 'Tus Derechos', icon: Shield },
    { id: 'contacto', title: 'Contacto', icon: Mail }
  ];

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'introduccion':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Política de Privacidad</h3>
            <p className="text-gray-300">
              En Mutante.web, nos comprometemos a proteger y respetar tu privacidad. Esta política explica cómo recopilamos, 
              utilizamos y protegemos tu información personal cuando utilizas nuestros servicios.
            </p>
            <p className="text-gray-300">
              <strong>Última actualización:</strong> Enero 2025
            </p>
            <div className="bg-teal-500/20 p-4 rounded-lg border border-teal-500/30">
              <h4 className="font-bold text-teal-500 mb-2">Resumen Ejecutivo</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Solo recopilamos datos necesarios para brindar nuestros servicios</li>
                <li>• Nunca vendemos tu información personal a terceros</li>
                <li>• Utilizamos encriptación de nivel bancario para proteger tus datos</li>
                <li>• Tienes control total sobre tu información</li>
              </ul>
            </div>
          </div>
        );

      case 'datos-recopilados':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Datos que Recopilamos</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-teal-500 mb-2">Información de Cuenta</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Nombre completo y dirección de email</li>
                  <li>• Contraseña (encriptada)</li>
                  <li>• Información de perfil opcional</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-500 mb-2">Información del Negocio</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Nombre y tipo de negocio</li>
                  <li>• Dirección y datos de contacto</li>
                  <li>• Horarios de operación</li>
                  <li>• Información de redes sociales (opcional)</li>
                  <li>• Métricas de rendimiento del negocio</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">Datos de Uso</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Páginas visitadas y tiempo de permanencia</li>
                  <li>• Interacciones con nuestras herramientas</li>
                  <li>• Logs de errores y rendimiento</li>
                  <li>• Dirección IP y datos del navegador</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-purple-500 mb-2">Cookies y Tecnologías Similares</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Cookies esenciales para el funcionamiento</li>
                  <li>• Cookies de análisis (con tu consentimiento)</li>
                  <li>• Cookies de personalización</li>
                  <li>• Local Storage para preferencias</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'uso-datos':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Cómo Utilizamos tus Datos</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-teal-500 mb-2">Prestación de Servicios</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Crear y gestionar tu cuenta</li>
                  <li>• Proporcionar análisis personalizados</li>
                  <li>• Generar contenido para tu negocio</li>
                  <li>• Ofrecer soporte técnico</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-500 mb-2">Mejora del Servicio</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Analizar patrones de uso para optimizar la plataforma</li>
                  <li>• Desarrollar nuevas funcionalidades</li>
                  <li>• Detectar y corregir errores</li>
                  <li>• Realizar investigación y desarrollo</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">Comunicación</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Enviar actualizaciones importantes del servicio</li>
                  <li>• Responder a consultas de soporte</li>
                  <li>• Enviar newsletters (solo con tu consentimiento)</li>
                  <li>• Notificaciones de seguridad</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-purple-500 mb-2">Cumplimiento Legal</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Cumplir con obligaciones legales</li>
                  <li>• Proteger nuestros derechos legales</li>
                  <li>• Prevenir fraude y abuso</li>
                  <li>• Cooperar con autoridades cuando sea requerido</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'proteccion':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Protección de tus Datos</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-teal-500 mb-2">Medidas Técnicas</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Encriptación SSL/TLS para todas las comunicaciones</li>
                  <li>• Encriptación de datos en reposo</li>
                  <li>• Autenticación de dos factores disponible</li>
                  <li>• Monitoreo continuo de seguridad</li>
                  <li>• Backups automáticos y seguros</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-500 mb-2">Medidas Organizacionales</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Acceso limitado a datos personales</li>
                  <li>• Capacitación regular en privacidad</li>
                  <li>• Políticas internas de seguridad</li>
                  <li>• Auditorías de seguridad regulares</li>
                  <li>• Acuerdos de confidencialidad con empleados</li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">Infraestructura</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Servidores en centros de datos certificados</li>
                  <li>• Redundancia y alta disponibilidad</li>
                  <li>• Firewalls y sistemas de detección de intrusiones</li>
                  <li>• Actualizaciones de seguridad automáticas</li>
                </ul>
              </div>

              <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="font-bold text-red-500 mb-2">⚠️ Importante</h4>
                <p className="text-gray-300 text-sm">
                  Aunque implementamos las mejores prácticas de seguridad, ningún sistema es 100% seguro. 
                  Te recomendamos usar contraseñas fuertes y únicas para tu cuenta.
                </p>
              </div>
            </div>
          </div>
        );

      case 'derechos':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Tus Derechos</h3>
            
            <p className="text-gray-300 mb-4">
              Tienes los siguientes derechos respecto a tus datos personales:
            </p>

            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-teal-500 mb-2">Derecho de Acceso</h4>
                <p className="text-gray-300 text-sm">
                  Puedes solicitar una copia de todos los datos personales que tenemos sobre ti.
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-500 mb-2">Derecho de Rectificación</h4>
                <p className="text-gray-300 text-sm">
                  Puedes solicitar la corrección de datos inexactos o incompletos.
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">Derecho de Supresión</h4>
                <p className="text-gray-300 text-sm">
                  Puedes solicitar la eliminación de tus datos personales en ciertas circunstancias.
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-purple-500 mb-2">Derecho de Portabilidad</h4>
                <p className="text-gray-300 text-sm">
                  Puedes solicitar la transferencia de tus datos a otro proveedor de servicios.
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-green-500 mb-2">Derecho de Oposición</h4>
                <p className="text-gray-300 text-sm">
                  Puedes oponerte al procesamiento de tus datos para marketing directo.
                </p>
              </div>

              <div className="bg-teal-500/20 p-4 rounded-lg border border-teal-500/30">
                <h4 className="font-bold text-teal-500 mb-2">Cómo Ejercer tus Derechos</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Para ejercer cualquiera de estos derechos, contáctanos en:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Email: privacy@mutante.web</li>
                  <li>• WhatsApp: +54 9 3489 70-5875</li>
                  <li>• Desde tu panel de usuario</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'contacto':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contacto y Consultas</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-teal-500 mb-2">Delegado de Protección de Datos</h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-teal-500" />
                    <span>privacy@mutante.web</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-teal-500" />
                    <span>+54 9 3489 70-5875</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-500 mb-2">Soporte General</h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>info@mutante.web</span>
                  </div>
                  <p>Horario de atención: Lunes a Viernes, 9:00 - 18:00 (GMT-3)</p>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">Dirección Postal</h4>
                <div className="text-gray-300 text-sm">
                  <p>Mutante.web</p>
                  <p>Campana, Buenos Aires</p>
                  <p>Argentina</p>
                </div>
              </div>

              <div className="bg-amber-500/20 p-4 rounded-lg border border-amber-500/30">
                <h4 className="font-bold text-amber-500 mb-2">Tiempo de Respuesta</h4>
                <p className="text-gray-300 text-sm">
                  Nos comprometemos a responder a todas las consultas de privacidad dentro de 72 horas hábiles. 
                  Para solicitudes complejas, el tiempo máximo de respuesta es de 30 días.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-slate-800 p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-teal-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Política de Privacidad</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-1/3 bg-slate-800 border-r border-slate-700 overflow-y-auto">
            <nav className="p-4">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors mb-2 ${
                      activeSection === section.id
                        ? 'bg-teal-500/20 text-teal-500 border border-teal-500/30'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;