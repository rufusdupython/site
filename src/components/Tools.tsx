import React from 'react';
import { BarChart3, Bot, Sparkles, ExternalLink } from 'lucide-react';

const Tools: React.FC = () => {
  const tools = [
    {
      icon: BarChart3,
      title: 'Centro de Análisis',
      description: 'Dashboard completo con métricas en tiempo real, análisis de tendencias y reportes automatizados.',
      features: [
        'Análisis de ventas y conversiones',
        'Métricas de rendimiento web',
        'Reportes personalizables',
        'Exportación de datos'
      ],
      color: 'teal'
    },
    {
      icon: Bot,
      title: 'Bot Analista Local',
      description: 'IA especializada en tu mercado local que analiza competencia y sugiere optimizaciones.',
      features: [
        'Análisis de competencia local',
        'Sugerencias personalizadas',
        'Tendencias del mercado',
        'Chat interactivo 24/7'
      ],
      color: 'indigo'
    },
    {
      icon: Sparkles,
      title: 'Generador de Contenido',
      description: 'Crea contenido para redes sociales automáticamente basado en tu negocio y audiencia.',
      features: [
        'Posts para Instagram/Facebook',
        'Stories y reels',
        'Calendario de contenido',
        'Hashtags locales optimizados'
      ],
      color: 'amber'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: 'border-teal-500/30 hover:shadow-teal-500/20 bg-teal-500/20 text-teal-500 group-hover:bg-teal-500/30',
      indigo: 'border-indigo-500/30 hover:shadow-indigo-500/20 bg-indigo-500/20 text-indigo-500 group-hover:bg-indigo-500/30',
      amber: 'border-amber-500/30 hover:shadow-amber-500/20 bg-amber-500/20 text-amber-500 group-hover:bg-amber-500/30'
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="herramientas" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Suite de Herramientas Inteligentes</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Accede a un ecosistema completo de herramientas diseñadas para potenciar tu comercio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            const colorClasses = getColorClasses(tool.color);
            
            return (
              <div 
                key={index}
                className={`group bg-slate-900/80 backdrop-blur border ${colorClasses.split(' ')[0]} p-8 rounded-lg transition-all duration-300 hover:shadow-xl ${colorClasses.split(' ')[1]} hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${colorClasses.split(' ')[2]} rounded-lg flex items-center justify-center mb-6 ${colorClasses.split(' ')[5]} transition-colors`}>
                  <IconComponent className={`w-8 h-8 ${colorClasses.split(' ')[3]}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-mono">{tool.title}</h3>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button 
            onClick={() => scrollToSection('demo')}
            className="group bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-4 px-8 rounded text-lg transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 inline-flex items-center"
          >
            <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Acceder a la Plataforma Completa
          </button>
          <p className="text-gray-400 text-sm mt-4">Requiere registro y plan activo</p>
        </div>
      </div>
    </section>
  );
};

export default Tools;