import React, { useState } from 'react';
import { MapPin, MessageCircle, Mail, Clock, Instagram, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    acceptPrivacy: false
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setContactForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te responderemos a la brevedad con una propuesta técnica personalizada.');
    setContactForm({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
      acceptPrivacy: false
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Suscripción exitosa! Recibirás actualizaciones técnicas y nuevas funcionalidades.');
    setNewsletterEmail('');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Campana, Buenos Aires',
      color: 'teal'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+54 9 3489 70-5875',
      link: 'https://wa.me/5493489705875',
      color: 'teal'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@mutante.web',
      color: 'teal'
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      content: 'Lunes a Viernes: 9:00 - 18:00',
      color: 'teal'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/t.ech404/',
      color: 'pink-500',
      hoverColor: 'pink-500/30'
    },
    {
      icon: Linkedin,
      href: '#',
      color: 'blue-500',
      hoverColor: 'blue-500/30'
    },
    {
      icon: Github,
      href: '#',
      color: 'gray-500',
      hoverColor: 'gray-500/30'
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Conecta con Nosotros</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Inicia tu transformación digital hoy mismo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contacto Info */}
          <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 font-mono">Información de Contacto</h3>
            <ul className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = info.link ? (
                  <a href={info.link} className="text-teal-500 hover:text-teal-400 transition-colors">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-300">{info.content}</p>
                );

                return (
                  <li key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mt-1">
                      <IconComponent className="w-5 h-5 text-teal-500" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium font-mono">{info.title}</h4>
                      {content}
                    </div>
                  </li>
                );
              })}
            </ul>
            
            <div>
              <h4 className="font-medium mb-4 font-mono">Síguenos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-${social.color}/20 rounded-lg flex items-center justify-center text-${social.color} hover:bg-${social.hoverColor} transition-colors`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-lg md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 font-mono">Envíanos un Mensaje</h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-nombre" className="block text-gray-300 font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="contact-nombre"
                    name="nombre"
                    value={contactForm.nombre}
                    onChange={handleContactChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="contact-asunto" className="block text-gray-300 font-medium mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="contact-asunto"
                  name="asunto"
                  value={contactForm.asunto}
                  onChange={handleContactChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="Asunto de tu mensaje"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact-mensaje" className="block text-gray-300 font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="contact-mensaje"
                  name="mensaje"
                  rows={5}
                  value={contactForm.mensaje}
                  onChange={handleContactChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-teal-500 focus:ring-0 focus:outline-none transition-colors"
                  placeholder="Describe tu proyecto o consulta..."
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  name="acceptPrivacy"
                  checked={contactForm.acceptPrivacy}
                  onChange={handleContactChange}
                  className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500 focus:ring-2"
                  required
                />
                <label htmlFor="acceptPrivacy" className="ml-2 text-gray-300 text-sm">
                  Acepto la política de privacidad y el tratamiento de mis datos
                </label>
              </div>
              
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-8 rounded transition-all shadow-lg shadow-teal-500/30"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto">
            <h4 className="text-lg font-bold mb-4 font-mono">Actualizaciones Técnicas</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Recibe las últimas actualizaciones técnicas y nuevas funcionalidades
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Tu email"
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-l text-white focus:border-teal-500 focus:ring-0 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-slate-900 px-4 py-2 rounded-r transition-all"
              >
                Suscribirse
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-2">
              Al suscribirte, aceptas nuestra política de privacidad. Sin spam, solo contenido técnico relevante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;