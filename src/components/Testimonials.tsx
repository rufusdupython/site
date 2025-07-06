import React, { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ clients: 0, conversion: 0, uptime: 0 });

  const testimonials = [
    {
      name: 'Miguel Rodríguez',
      business: 'Autopartes Rodríguez - Campana',
      avatar: 'MR',
      gradient: 'from-teal-500 to-indigo-500',
      text: 'El bot analista me ayudó a identificar que mis clientes buscaban repuestos específicos los fines de semana. Ajusté mi inventario y las ventas aumentaron 340% en 2 meses.',
      rating: 5
    },
    {
      name: 'Laura Castro',
      business: 'Boutique Trendy - Zárate',
      avatar: 'LC',
      gradient: 'from-indigo-500 to-amber-500',
      text: 'El generador de contenido automático me ahorra 15 horas semanales. Ahora tengo posts consistentes y mi engagement en Instagram creció 280%. Es como tener un community manager 24/7.',
      rating: 4.5
    },
    {
      name: 'Diego Fernández',
      business: 'TechFix - Escobar',
      avatar: 'DF',
      gradient: 'from-amber-500 to-teal-500',
      text: 'Como técnico, entiendo de tecnología, pero Mutante.web llevó mi negocio al siguiente nivel. El dashboard me muestra exactamente qué servicios demanda más mi zona. ROI del 450%.',
      rating: 5
    }
  ];

  useEffect(() => {
    // Animate stats
    const animateStats = () => {
      const targetStats = { clients: 32, conversion: 420, uptime: 99.8 };
      let currentStats = { clients: 0, conversion: 0, uptime: 0 };
      
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      const increment = {
        clients: targetStats.clients / steps,
        conversion: targetStats.conversion / steps,
        uptime: targetStats.uptime / steps
      };
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        currentStats.clients += increment.clients;
        currentStats.conversion += increment.conversion;
        currentStats.uptime += increment.uptime;
        
        if (step >= steps) {
          currentStats = targetStats;
          clearInterval(timer);
        }
        
        setStats({
          clients: Math.floor(currentStats.clients),
          conversion: Math.floor(currentStats.conversion),
          uptime: Number(currentStats.uptime.toFixed(1))
        });
      }, stepTime);
    };

    animateStats();

    // Auto slide testimonials
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-current text-amber-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-current text-amber-500" />);
    }

    return stars;
  };

  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Resultados Medibles</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comercios de Campana y zona norte que ya evolucionaron con nuestras herramientas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-teal-500 mb-4 font-mono tabular-nums">
              {stats.clients}+
            </div>
            <p className="text-xl text-gray-300">Comercios transformados</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-teal-500 mb-4 font-mono tabular-nums">
              {stats.conversion}%
            </div>
            <p className="text-xl text-gray-300">Aumento promedio en conversiones</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-teal-500 mb-4 font-mono tabular-nums">
              {stats.uptime}%
            </div>
            <p className="text-xl text-gray-300">Uptime garantizado</p>
          </div>
        </div>

        {/* Testimonios Section */}
        <div id="testimonios">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Casos de Éxito</h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg">
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-xl`}>
                          {testimonial.avatar}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold font-mono text-lg">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.business}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-teal-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;