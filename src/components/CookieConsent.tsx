import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield, BarChart3 } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre true, no se puede desactivar
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Verificar si ya se dio consentimiento
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      initializeServices(savedPreferences);
    }
  }, []);

  const initializeServices = (prefs: CookiePreferences) => {
    // Inicializar Google Analytics si está permitido
    if (prefs.analytics && import.meta.env.VITE_GA_MEASUREMENT_ID) {
      // Cargar Google Analytics
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      };
    }

    // Inicializar otros servicios según las preferencias
    if (prefs.marketing) {
      // Aquí se pueden inicializar pixels de Facebook, etc.
    }

    if (prefs.functional) {
      // Aquí se pueden inicializar servicios funcionales como chat, etc.
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    initializeServices(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCustomPreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    initializeServices(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // No se puede cambiar
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Cookies Necesarias',
      description: 'Esenciales para el funcionamiento básico del sitio web. No se pueden desactivar.',
      icon: Shield,
      required: true
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Cookies Funcionales',
      description: 'Permiten funcionalidades mejoradas como chat en vivo y preferencias de usuario.',
      icon: Settings,
      required: false
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Cookies de Análisis',
      description: 'Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web.',
      icon: BarChart3,
      required: false
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Cookies de Marketing',
      description: 'Utilizadas para mostrar anuncios relevantes y medir la efectividad de campañas.',
      icon: Cookie,
      required: false
    }
  ];

  if (!showBanner) return null;

  return (
    <>
      {/* Banner de Cookies */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 p-6 z-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Cookie className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Uso de Cookies</h3>
                <p className="text-gray-300 text-sm max-w-2xl">
                  Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. 
                  Puedes aceptar todas las cookies o personalizar tus preferencias.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Personalizar
              </button>
              <button
                onClick={acceptNecessary}
                className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Solo Necesarias
              </button>
              <button
                onClick={acceptAll}
                className="bg-teal-500 hover:bg-teal-600 text-slate-900 px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Aceptar Todas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Configuración */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-slate-800 p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Configuración de Cookies</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-300 mb-6">
                Gestiona tus preferencias de cookies. Puedes habilitar o deshabilitar diferentes tipos de cookies según tus preferencias.
              </p>

              <div className="space-y-6">
                {cookieTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={type.key} className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-teal-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white mb-1">{type.title}</h3>
                            <p className="text-gray-400 text-sm">{type.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          {type.required ? (
                            <span className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded">
                              Requerido
                            </span>
                          ) : (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences[type.key]}
                                onChange={() => handlePreferenceChange(type.key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-800 p-6 border-t border-slate-700">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="bg-teal-500 hover:bg-teal-600 text-slate-900 px-6 py-2 rounded font-medium transition-colors"
                >
                  Guardar Preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;