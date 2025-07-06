import React from 'react';
import { Bot, BarChart3, Shield, TrendingUp } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Bot Analista IA',
      description: 'Asistente inteligente especializado en comercios de Campana que analiza tu negocio 24/7 y te da recomendaciones precisas.',
      badges: [
        { label: '24/7 Activo', color: 'green' },
        { label: 'IA Local', color: 'blue' }
      ],
      color: 'indigo'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Inteligente',
      description: 'Visualiza todos tus datos en tiempo real con gráficos que realmente te ayudan a tomar decisiones.',
      badges: [
        { label: 'Tiempo Real', color: 'teal' },
        { label: 'Gráficos Smart', color: 'teal' }
      ],
      color: 'teal'
    },
    {
      icon: Shield,
      title: 'Seguridad Avanzada',
      description: 'Protección multicapa con encriptación end-to-end, backups automáticos y monitoreo 24/7.',
      badges: [
        { label: 'SSL/TLS', color: 'green' },
        { label: 'Backup', color: 'blue' },
        { label: 'Monitor', color: 'purple' }
      ],
      color: 'amber'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Inteligente',
      description: 'Machine learning aplicado a tus datos para predicciones precisas y recomendaciones accionables.',
      badges: [
        { label: 'ML Predictions', color: 'teal' },
        { label: 'Real-time Data', color: 'teal' },
        { label: 'Smart Insights', color: 'teal' },
        { label: 'Auto Alerts', color: 'teal' }
      ],
      color: 'teal'
    }
  ];

  const getBadgeColors = (color: string) => {
    const colors = {
      green: 'bg-green-500/20 text-green-400',
      blue: 'bg-blue-500/20 text-blue-400',
      purple: 'bg-purple-500/20 text-purple-400',
      teal: 'bg-teal-500/20 text-teal-400'
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  const getFeatureColors = (color: string) => {
    const colors = {
      indigo: 'border-indigo-500/30 hover:shadow-indigo-500/20 bg-indigo-500/20 text-indigo-500',
      teal: 'border-teal-500/30 hover:shadow-teal-500/20 bg-teal-500/20 text-teal-500',
      amber: 'border-amber-500/30 hover:shadow-amber-500/20 bg-amber-500/20 text-amber-500'
    };
    return colors[color as keyof typeof colors] || colors.teal;
  };

  return (
    <section id="caracteristicas" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">Tecnología que Funciona</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Herramientas diseñadas específicamente para comercios de Campana y zona norte
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = getFeatureColors(feature.color);
            
            return (
              <div 
                key={index}
                className={`bg-slate-900/80 backdrop-blur border ${colorClasses.split(' ')[0]} p-8 rounded-lg transition-all duration-300 hover:shadow-xl ${colorClasses.split(' ')[1]} hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${colorClasses.split(' ')[2]} rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className={`w-8 h-8 ${colorClasses.split(' ')[3]}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-mono">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {feature.badges.map((badge, badgeIndex) => (
                    <div 
                      key={badgeIndex}
                      className={`${getBadgeColors(badge.color)} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {badge.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;