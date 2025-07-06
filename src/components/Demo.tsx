import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';

const Demo: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por solicitar una demo técnica! Te contactaremos pronto para coordinar la sesión.');
    setFormData({
      nombre: '',
      empresa: '',
      email: '',
      telefono: '',
      acceptTerms: false
    });
  };

  const demoFeatures = [
    'Análisis técnico gratuito de tu infraestructura actual',
    'Demo en vivo del bot analista con datos de tu zona',
    'Prueba del generador de contenido personalizado',
    'Roadmap técnico personalizado para tu comercio',
    'Sesión de 45 minutos con especialista técnico'
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 font-mono">Demo Técnica en Vivo</h2>
              <p className="text-gray-300 mb-6">
                Experimenta nuestras herramientas en acción con una demostración personalizada para tu tipo de comercio.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-gray-300 font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="empresa" className="block text-gray-300 font-medium mb-2">
                    Nombre del Comercio
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="Ingresa el nombre de tu comercio"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-gray-300 font-medium mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="11 1234-5678"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="acceptTerms" className="ml-2 text-gray-300 text-sm">
                    Acepto recibir información técnica y actualizaciones
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-6 rounded transition-all shadow-lg shadow-teal-500/30"
                >
                  Solicitar Demo Técnica
                </button>
              </form>
            </div>
            
            <div className="bg-slate-800 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Code Pattern Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="font-mono text-xs text-teal-500 space-y-2">
                  <div>{'{"code": true}'}</div>
                  <div>function() {}</div>
                  <div>const data = []</div>
                  <div>return result;</div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-mono">¿Qué incluye la demo?</h3>
                <ul className="space-y-4 mb-8">
                  {demoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 flex items-center justify-center mt-1">
                        <Check className="w-5 h-5 text-teal-500" />
                      </div>
                      <p className="ml-3 text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-amber-500/20 p-4 rounded-lg border border-amber-500/30">
                  <div className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center mt-1">
                      <Info className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="ml-3 text-gray-300 text-sm">
                      Demo completamente gratuita. Te mostramos el potencial real de nuestras herramientas aplicadas a tu negocio específico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;