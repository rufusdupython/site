import React, { useState } from 'react';
import { Store } from 'lucide-react';
import BusinessLogin from './BusinessLogin';

const BusinessButton: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {/* Floating Business Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="group bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold py-3 px-6 rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center space-x-2 hover:scale-105"
        >
          <Store className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-mono">Mi Negocio</span>
        </button>
      </div>

      {/* Business Login Modal */}
      <BusinessLogin 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
};

export default BusinessButton;