import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Características', href: '#caracteristicas' },
    { name: 'Herramientas', href: '#herramientas' },
    { name: 'Planes', href: '#planes' },
    { name: 'Casos', href: '#testimonios' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const serviceLinks = [
    'Análisis de Datos',
    'Bot Analista IA',
    'Generación de Contenido',
    'Automatización',
    'SEO Local',
    'Herramientas Avanzadas'
  ];

  const legalLinks = [
    { name: 'Términos de Servicio', href: '#' },
    { name: 'Política de Privacidad', href: '#' },
    { name: 'Soporte Técnico', href: '#' }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/t.ech404/',
      name: 'Instagram'
    },
    {
      icon: Linkedin,
      href: '#',
      name: 'LinkedIn'
    },
    {
      icon: Github,
      href: '#',
      name: 'GitHub'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <button 
              onClick={() => scrollToSection('#hero')}
              className="text-3xl font-bold font-mono text-teal-500 mb-6 block hover:text-teal-400 transition-colors cursor-pointer"
            >
              Mutante.web
            </button>
            <p className="text-gray-400 mb-6">
              Transformamos comercios locales en negocios digitales inteligentes con herramientas de análisis avanzado e IA.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-mono">Navegación</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-teal-500 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-mono">Servicios</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <button className="text-gray-400 hover:text-teal-500 transition-colors text-left">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-mono">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              <p>📍 Campana, Buenos Aires</p>
              <p>📱 +54 9 3489 70-5875</p>
              <p>✉️ info@mutante.web</p>
              <p>🕒 Lun-Vie: 9:00-18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 font-mono">
              &copy; 2025 Mutante.web. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-teal-500 text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;