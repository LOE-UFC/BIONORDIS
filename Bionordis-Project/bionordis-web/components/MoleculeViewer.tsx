'use client';

import React, { useMemo } from 'react';
import * as OCL from 'openchemlib';
import { FileCode2, Image as ImageIcon } from 'lucide-react';

interface MoleculeViewerProps {
  smiles: string;
  name?: string;
  width?: number;
  height?: number;
}

export default function MoleculeViewer({ smiles, name, width = 400, height = 400 }: MoleculeViewerProps) {
  const svgContent = useMemo(() => {
    if (!smiles) return null;

    try {
      const mol = OCL.Molecule.fromSmiles(smiles);
      return mol.toSVG(width, height, undefined, {
        autoCrop: true,
        autoCropMargin: 35,
        suppressChiralText: false,
        transparentBnd: true,
      });
    } catch (error) {
      return null;
    }
  }, [smiles, width, height]);

  const getFileName = (extension: string) => {
    const safeName = name ? name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'estrutura';
    return `${safeName}.${extension}`;
  };

  const downloadSVG = () => {
    if (!svgContent) return;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = getFileName('svg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgContent) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = getFileName('png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  if (!svgContent) {
    return (
      <div 
        className="flex items-center justify-center bg-red-50 text-red-500 rounded-2xl text-xs text-center p-4 border border-red-100"
        style={{ width, height }}
      >
        Estrutura SMILES inválida ou não suportada.
      </div>
    );
  }

  return (
    <div className="relative group flex flex-col items-center justify-center w-full h-full bg-white rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 mix-blend-multiply pointer-events-none"></div>

      <div 
        dangerouslySetInnerHTML={{ __html: svgContent }} 
        className="relative z-10 flex items-center justify-center w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
      />
      
      <div className="absolute bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-slate-200/60">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2 select-none">
          Export
        </span>
        <button
          onClick={downloadSVG}
          className="hover:bg-slate-100 text-slate-600 p-1.5 rounded-lg transition-colors flex items-center justify-center"
          title="Download SVG"
        >
          <FileCode2 size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={downloadPNG}
          className="hover:bg-slate-100 text-slate-600 p-1.5 rounded-lg transition-colors flex items-center justify-center"
          title="Download PNG"
        >
          <ImageIcon size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}