import React from 'react';

const TechStack: React.FC = () => {
  const stack = [
    { category: "Frontend", items: ["React", "Electron", "Tailwind"] },
    { category: "AI & Vision", items: ["Gemini 1.5 Pro", "YOLOv11", "OpenCV"] },
    { category: "Voice", items: ["ElevenLabs", "Whisper"] },
    { category: "Infrastructure", items: ["FFMPEG", "Google Cloud"] },
  ];

  return (
    <div className="bg-black py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 tracking-wider uppercase mb-8">
          Built With Industry-Leading Technology
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stack.map((group, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h4 className="text-brand-500 text-xs font-bold uppercase mb-4 tracking-widest">{group.category}</h4>
              <div className="flex flex-col space-y-2 text-center">
                {group.items.map((item, i) => (
                  <span key={i} className="text-slate-400 text-sm font-medium hover:text-white transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;