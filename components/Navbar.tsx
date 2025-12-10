import React, { useState } from 'react';
import { Menu, X, Crosshair } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Crosshair className="h-8 w-8 text-brand-400" />
            <span className="font-bold text-xl tracking-tight text-white">
              GameCoach<span className="text-brand-400"> AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">Features</a>
              <a href="#ai-tech" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">How it Works</a>
              <a href="#audience" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">For You</a>
              <button className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                Get Early Access
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#ai-tech" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>How it Works</a>
            <a href="#audience" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Who is it for?</a>
            <button className="w-full text-left bg-brand-600 text-white px-3 py-3 rounded-md text-base font-medium mt-4">
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;