import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Análisis Técnico',
      description: 'Auditoría completa de tu infraestructura digital actual y mapeo de oportunidades de optimización.',
      color: 'teal'
    },
    {
      number: '02',
      title: 'Configuración IA',
      description: 'Entrenamiento del bot analista con datos específicos de tu negocio y mercado local.',
      color: 'indigo'
    },
    {
      number: '03',
      title: 'Implementación',
      description: 'Desarrollo e integración de todas las herramientas con testing continuo y optimización.',
      color: 'amber'
    },
    {
      number: '04',
      title: 'Monitoreo Activo',
      description: 'Lanzamiento con monitoreo en tiempo real y soporte técnico especializado.',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: 'bg-teal-500 text-slate-900',
      indigo: 'bg-indigo-500 text-white',
      amber: 'bg-amber-500 text-slate-900'
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <section id="proceso" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Proceso de Implementación</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Metodología ágil para transformar tu comercio en 4 fases
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-amber-500 -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-slate-900/80 backdrop-blur border border-slate-700 p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1 text-center"
              >
                <div className={`w-16 h-16 ${getColorClasses(step.color)} rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6 font-mono`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 font-mono">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;