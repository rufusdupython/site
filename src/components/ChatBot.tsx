import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: '¡Hola! Soy tu analista especializado en comercios de Campana y zona norte. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('ventas') || lowerMessage.includes('vender')) {
      return '📊 Analicé los patrones de venta en Campana. Para tu sector, recomiendo optimizar las horas de 14-16h y 19-21h cuando hay mayor actividad local. ¿Quieres que analice tu competencia directa?';
    } else if (lowerMessage.includes('competencia') || lowerMessage.includes('competidor')) {
      return '🔍 Detecté 3 competidores principales en tu zona. Están usando estrategias de precios agresivas los fines de semana. Te sugiero diferenciarte por servicio personalizado. ¿Necesitas un análisis detallado?';
    } else if (lowerMessage.includes('redes') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
      return '📱 Para comercios en Campana, Instagram Stories a las 20:30h tienen 340% más engagement. Te recomiendo contenido local con hashtags #Campana #ZonaNorte. ¿Activo el generador automático?';
    } else if (lowerMessage.includes('horario') || lowerMessage.includes('hora')) {
      return '⏰ Basándome en datos locales: Lunes-Viernes 9-12h y 15-19h son óptimos. Sábados 10-14h. Los domingos, solo si tu sector es gastronómico/entretenimiento. ¿Ajusto tu estrategia?';
    } else if (lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
      return '💰 El rango de precios competitivo en tu zona está 15% por debajo del promedio nacional. Sugiero estrategia de valor agregado en lugar de competir solo por precio. ¿Analizamos tu estructura de costos?';
    } else {
      const responses = [
        '🤖 Interesante consulta. Basándome en datos de 150+ comercios en Campana y zona norte, puedo ayudarte con análisis específicos. ¿Qué aspecto te interesa más: ventas, competencia, o marketing digital?',
        '📈 He procesado las tendencias locales de los últimos 6 meses. Tu sector muestra potencial de crecimiento del 35%. ¿Quieres que profundice en oportunidades específicas?',
        '🎯 Para comercios como el tuyo en esta zona, tengo 3 estrategias probadas que aumentaron ventas 40-60%. ¿Te interesa conocer cuál se adapta mejor a tu situación?',
        '📊 Los datos muestran patrones únicos en Campana vs otras ciudades. Puedo generar un reporte personalizado para tu negocio. ¿Qué métricas son prioritarias para ti?'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        text: generateBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all animate-bounce hover:animate-none"
        >
          <Bot className="w-7 h-7" />
        </button>
      </div>

      {/* Bot Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold font-mono">Bot Analista</h3>
                    <p className="text-sm text-gray-400">Especialista en tu zona</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-96 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-teal-500 text-slate-900 ml-8'
                        : 'bg-indigo-500/20 text-gray-300 mr-8'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-indigo-500/20 text-gray-300 mr-8 p-3 rounded-lg">
                    <p className="text-sm">
                      Bot está analizando... <span className="animate-pulse">●●●</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 text-white px-4 py-2 rounded transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;