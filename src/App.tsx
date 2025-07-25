import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Tools from './components/Tools';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Demo from './components/Demo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BusinessButton from './components/BusinessButton';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <AuthProvider>
      <div className="bg-slate-900 text-white min-h-screen">
        <Header />
        <Hero />
        <ProblemSolution />
        <Tools />
        <Features />
        <Pricing />
        <Testimonials />
        <Process />
        <Demo />
        <Contact />
        <Footer />
        <BusinessButton />
        <ChatBot />
        <CookieConsent />
      </div>
    </AuthProvider>
  );
}

export default App;