import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Personas from './Personas';
import Features from './Features';
import AiShowcase from './AiShowcase';
import TechStack from './TechStack';
import Footer from './Footer';
import CtaSection from './CtaSection';

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-brand-500 selection:text-white">
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="features" className="py-20">
          <Features />
        </section>

        <section id="ai-tech" className="py-20 bg-slate-900/50">
          <AiShowcase />
        </section>

        <section id="audience" className="py-20">
          <Personas />
        </section>

        <section id="cta" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-900/10 z-0"></div>
          <CtaSection />
        </section>
      </main>

      <TechStack />
      <Footer />
    </div>
  );
};

export default LandingPage;
