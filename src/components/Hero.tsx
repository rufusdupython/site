import React, { useState, useEffect } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = '> Inicializando sistema de transformación digital...';

  useEffect(() => {
    let index = 0;
    const typingTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 50);

    return () => clearInterval(typingTimer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-500 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-20 w-full relative z-10">
        <div className="max-w-5xl">
          <div className="font-mono text-teal-500 text-lg mb-4 h-8">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono leading-tight">
            Multiplica tus <span className="text-teal-500">Ventas</span> en Campana<br />
            con <span className="text-amber-500">IA Local</span>:<br />
            <span className="text-indigo-500">Tu Negocio en Piloto Automático</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl leading-relaxed">
            La única plataforma que combina análisis avanzado, IA especializada en Campana y automatización 
            para comercios de zona norte que quieren <strong className="text-teal-400">resultados reales, no promesas</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('herramientas')}
              className="group bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-4 px-8 rounded transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Explorar Herramientas
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="group bg-transparent hover:bg-teal-500/10 text-teal-500 border-2 border-teal-500 font-semibold py-4 px-8 rounded transition-all flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Demo en Vivo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;