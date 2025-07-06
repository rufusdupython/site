import React from 'react';
import { Check, Flame } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      subtitle: 'Digitalización Básica',
      originalPrice: 100000,
      price: 80000,
      monthly: 15000,
      preorderPrice: 64000,
      features: [
        'Sitio web optimizado (5 páginas)',
        'Dashboard básico de análisis',
        'SEO local optimizado',
        'Bot analista básico',
        'Soporte técnico por 6 meses'
      ],
      buttonText: 'Comenzar Ahora',
      buttonStyle: 'bg-slate-700 hover:bg-slate-600 text-white'
    },
    {
      name: 'Growth',
      subtitle: 'Inteligencia Aplicada',
      originalPrice: 450000,
      price: 350000,
      monthly: 25000,
      preorderPrice: 280000,
      features: [
        'Todo lo del plan Starter',
        'Bot analista IA avanzado',
        'Herramientas de análisis completo',
        'Integración con redes sociales',
        'Generador de contenido básico',
        'Soporte premium por 12 meses'
      ],
      buttonText: 'Elegir Growth',
      buttonStyle: 'bg-teal-500 hover:bg-teal-600 text-slate-900 shadow-lg shadow-teal-500/30',
      recommended: true
    },
    {
      name: 'Enterprise +Plus',
      subtitle: 'Asistente de Creación de Contenido Avanzado',
      originalPrice: 800000,
      price: 650000,
      monthly: 45000,
      preorderPrice: 520000,
      features: [
        'Todo lo del plan Growth',
        'E-commerce completo integrado',
        'Generador automático de contenido',
        'Soporte dedicado por 24 meses'
      ],
      buttonText: 'Contactar Ventas',
      buttonStyle: 'bg-indigo-500 hover:bg-indigo-600 text-white'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('ARS', '').trim();
  };

  return (
    <section id="planes" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Planes de Evolución</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Soluciones escalables que crecen con tu negocio. <strong>Resultados garantizados o te devolvemos tu dinero.</strong>
          </p>
          
          {/* Oferta de Preventa */}
          <div className="bg-gradient-to-r from-amber-500/20 to-teal-500/20 p-6 rounded-lg border border-amber-500/30 mt-8 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Flame className="w-8 h-8 text-amber-500 mr-3" />
              <h3 className="text-2xl font-bold text-amber-500 font-mono">OFERTA DE PREVENTA - SOLO 10 CUPOS</h3>
              <Flame className="w-8 h-8 text-amber-500 ml-3" />
            </div>
            <p className="text-lg text-gray-300 mb-4">
              <strong>20% OFF</strong> en el pago inicial para los primeros comercios que confíen en nosotros
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full">✓ Implementación prioritaria</span>
              <span className="bg-teal-500/20 text-teal-500 px-3 py-1 rounded-full">✓ Soporte dedicado 24/7</span>
              <span className="bg-indigo-500/20 text-indigo-500 px-3 py-1 rounded-full">✓ Capacitación personalizada</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-slate-900/80 backdrop-blur border ${plan.recommended ? 'border-2 border-teal-500 transform scale-105' : 'border-slate-700'} rounded-lg transition-all duration-300 hover:shadow-xl ${plan.recommended ? 'hover:shadow-teal-500/20' : 'hover:shadow-slate-500/20'} hover:-translate-y-1 overflow-hidden relative`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0">
                  <div className="bg-teal-500 text-slate-900 text-sm font-bold py-1 px-4 rounded-bl-lg font-mono">
                    Recomendado
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 font-mono">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.subtitle}</p>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 line-through">
                    {formatPrice(plan.originalPrice)}
                  </div>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold font-mono">{formatPrice(plan.price).replace('.', 'K')}</span>
                    <span className="text-gray-400 ml-2">inicial + {formatPrice(plan.monthly).replace('.', 'K')}/mes</span>
                  </div>
                  <div className="text-sm text-amber-500 mt-1">
                    PREVENTA: {formatPrice(plan.preorderPrice).replace('.', 'K')} inicial
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-6 h-6 flex items-center justify-center mt-1">
                        <Check className="w-5 h-5 text-teal-500" />
                      </div>
                      <p className="ml-3 text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="px-8 pb-8">
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className={`block w-full ${plan.buttonStyle} font-semibold py-3 px-6 rounded text-center transition-all`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            <strong>Garantía de 30 días:</strong> Si no ves resultados medibles en el primer mes, te devolvemos el 100% de tu inversión.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-teal-500/20 text-teal-500 px-3 py-1 rounded-full">✓ Sin permanencia</span>
            <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full">✓ Migración gratuita</span>
            <span className="bg-indigo-500/20 text-indigo-500 px-3 py-1 rounded-full">✓ Capacitación incluida</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;