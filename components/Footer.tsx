import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-tight text-white">
            GameCoach<span className="text-brand-400"> AI</span>
          </span>
          <p className="text-slate-500 text-sm mt-2">
            © {new Date().getFullYear()} GameCoach AI. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Twitter</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;