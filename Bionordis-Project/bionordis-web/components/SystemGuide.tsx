"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Search, FlaskConical, Database, X, ArrowRight } from "lucide-react";

export default function SystemGuide() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("bionordis_tutorial_seen");

    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const closeGuide = () => {
    setIsOpen(false);
    localStorage.setItem("bionordis_tutorial_seen", "true");
  };

  const openGuide = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Aqui adicionamos o w-fit e o self-start */}
      <button 
        onClick={openGuide}
        className="w-fit self-start flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors bg-white/50 px-3 py-1.5 rounded-full border border-slate-200 hover:border-emerald-200"
      >
        <HelpCircle size={16} />
        <span>How it works</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
            
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Welcome to Bionordis
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">Beta</span>
                    </h2>
                    <p className="text-slate-500 text-sm">Follow this quick guide to explore the biodiversity database.</p>
                </div>
                <button 
                    onClick={closeGuide}
                    className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md">
                        <Search size={32} />
                    </div>
                    <h3 className="font-bold text-slate-800">1. Search & Filter</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Find molecules by name or use advanced filters (Family, Biome, Class) to explore the catalog.
                    </p>
                </div>

                <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md">
                        <FlaskConical size={32} />
                    </div>
                    <h3 className="font-bold text-slate-800">2. Analyze Targets</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Our algorithm automatically highlights the most potent therapeutic target based on low IC50 values.
                    </p>
                </div>

                <div className="text-center space-y-3 group cursor-default">
                    <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md">
                        <Database size={32} />
                    </div>
                    <h3 className="font-bold text-slate-800">3. Scientific Data</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Access reliable, FAIR data with direct DOI links to the original scientific publications.
                    </p>
                </div>

            </div>

            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-end">
                <button 
                    onClick={closeGuide}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 active:scale-95"
                >
                    Get Started
                    <ArrowRight size={16} />
                </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}