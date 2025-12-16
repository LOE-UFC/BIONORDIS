'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FilterProps {
  opcoesFamilias: string[];
  opcoesBiomas: string[];
  opcoesClasse: string[];
  opcoesSubclasse: string[];
  opcoesInstituicao: string[];
  opcoesBiodiversidade: string[];
  onSearch?: () => void;
}

export default function AdvancedFilter({ opcoesFamilias, opcoesBiomas, opcoesClasse, opcoesSubclasse, opcoesInstituicao, opcoesBiodiversidade, onSearch }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. ESTADO: Inicializa com o valor da URL ou vazio
  const [familia, setFamilia] = useState(searchParams.get('familia') || '');
  const [bioma, setBioma] = useState(searchParams.get('bioma') || '');
  const [classe, setClasse] = useState(searchParams.get('classe') || '');
  const [subclasse, setSubclasse] = useState(searchParams.get('subclasse') || '');
  const [instituicao, setInstituicao] = useState(searchParams.get('instituicao') || '');
  const [biodiversidade, setBiodiversidade] = useState(searchParams.get('biodiversidade') || '');

  // --- Função Principal de Pesquisa ---
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    const atualizarFiltro = (chave: string, valor: string) => {
      if (valor) {
        params.set(chave, valor);
      } else {
        params.delete(chave);
      }
    };

    // 2. APLICAÇÃO DOS FILTROS
    atualizarFiltro('familia', familia);
    atualizarFiltro('bioma', bioma);
    atualizarFiltro('classe', classe);
    atualizarFiltro('subclasse', subclasse);
    atualizarFiltro('instituicao', instituicao);
    atualizarFiltro('biodiversidade', biodiversidade);

    // 3. NAVEGAÇÃO
    router.push(`/?${params.toString()}`);
    
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 w-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-slate-700 font-bold text-lg">AdvancedFilters</h3>
      </div>
      
      {/* GRID DE INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Input: Família */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">Botanic Family</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
          >
            <option value="">All</option>
            {opcoesFamilias.map((f, index) => (
              <option key={index} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Input: Bioma */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">Biome</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={bioma}
            onChange={(e) => setBioma(e.target.value)}
          >
            <option value="">All</option>
            {opcoesBiomas.map((b, index) => (
              <option key={index} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Input: Classe */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">Class</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={bioma}
            onChange={(e) => setClasse(e.target.value)}
          >
            <option value="">All</option>
            {opcoesClasse.map((b, index) => (
              <option key={index} value={b}>{b}</option>
            ))}
          </select>
        </div>
        {/* Input: Subclasse */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">Subclass</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={subclasse}
            onChange={(e) => setSubclasse(e.target.value)}
          >
            <option value="">All</option>
            {opcoesSubclasse.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Input: Instituição */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">Institution / Laboratory</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={instituicao}
            onChange={(e) => setInstituicao(e.target.value)}
          >
            <option value="">All</option>
            {opcoesInstituicao.map((inst, i) => <option key={i} value={inst}>{inst}</option>)}
          </select>
        </div>

        {/* Input: Biodiversidade */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-500">Biodiversity (Type/)</label>
          <select 
            className="w-full h-12 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            value={biodiversidade}
            onChange={(e) => setBiodiversidade(e.target.value)}
          >
            <option value="">All</option>
            {opcoesBiodiversidade.map((bio, i) => <option key={i} value={bio}>{bio}</option>)}
          </select>
        </div>
      </div>
      
      {/* BOTÃO DE AÇÃO */}
      <div className="flex justify-center md:justify-end border-t border-slate-200 pt-6">
        <button 
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
        >
          <span>Aplicar Filtros</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </div>
  );
}