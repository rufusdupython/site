import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleNavClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-sm z-50 border-b border-teal-500/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-3xl font-bold font-mono text-teal-500 hover:text-teal-400 transition-colors cursor-pointer"
        >
          Mutante.web
        </button>
        
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection('caracteristicas')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Características
          </button>
          <button onClick={() => scrollToSection('herramientas')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Herramientas
          </button>
          <button onClick={() => scrollToSection('planes')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Planes
          </button>
          <button onClick={() => scrollToSection('testimonios')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Casos
          </button>
          <button onClick={() => scrollToSection('proceso')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Proceso
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-gray-300 hover:text-teal-500 font-medium transition-colors">
            Contacto
          </button>
        </nav>
        
        <button 
          onClick={() => scrollToSection('herramientas')}
          className="hidden md:flex items-center bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-2 px-6 rounded transition-all shadow-lg shadow-teal-500/30"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Acceder a Herramientas
        </button>
        
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-sm border-b border-teal-500/20">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('caracteristicas')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Características
            </button>
            <button onClick={() => scrollToSection('herramientas')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Herramientas
            </button>
            <button onClick={() => scrollToSection('planes')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Planes
            </button>
            <button onClick={() => scrollToSection('testimonios')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Casos
            </button>
            <button onClick={() => scrollToSection('proceso')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Proceso
            </button>
            <button onClick={() => scrollToSection('contacto')} className="text-gray-300 hover:text-teal-500 font-medium py-2 transition-colors text-left">
              Contacto
            </button>
            <button 
              onClick={() => scrollToSection('herramientas')}
              className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-2 px-6 rounded text-center transition-all"
            >
              Acceder a Herramientas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;