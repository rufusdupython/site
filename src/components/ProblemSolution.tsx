import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter < 87) {
        setCounter(prev => prev + 1);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [counter]);

  const problems = [
    'Datos dispersos sin análisis centralizado',
    'Decisiones basadas en intuición, no en datos',
    'Falta de automatización en procesos clave',
    'Contenido digital genérico y poco efectivo'
  ];

  const solutions = [
    'Dashboard unificado con análisis en tiempo real',
    'IA local que analiza tu negocio específicamente',
    'Automatización inteligente de tareas repetitivas',
    'Generación automática de contenido personalizado'
  ];

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">El desafío de los comercios modernos</h2>
          
          <div className="flex justify-center items-center mb-4">
            <div className="text-6xl md:text-7xl font-bold text-teal-500 font-mono tabular-nums">
              {counter}
            </div>
            <div className="text-3xl md:text-4xl font-bold ml-2 text-teal-500">%</div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            de comercios locales <strong className="text-red-400">pierden clientes</strong> porque no aprovechan 
            sus datos para tomar decisiones estratégicas que <strong className="text-teal-400">realmente funcionen</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Problema Card */}
          <div className="bg-slate-900/80 backdrop-blur border border-red-500/30 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-mono">Problemas Actuales</h3>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center mt-1">
                    <div className="w-4 h-4 rounded-full border-2 border-red-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-300">{problem}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Solución Card */}
          <div className="bg-slate-900/80 backdrop-blur border border-teal-500/30 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-teal-500/20 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-mono">Nuestra Solución</h3>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                  </div>
                  <p className="ml-3 text-gray-300">{solution}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;