'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdvancedFilter from './AdvancedFilter';

// Ícones
const XMarkIcon = () => (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const AdjustIcon = () => (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);

interface Props {
  total: number;
  // Recebendo todas as listas para passar ao AdvancedFilter
  opcoesFamilias: string[];
  opcoesBiomas: string[];
  opcoesClasses: string[];
  opcoesSubclasses: string[];
  opcoesInstituicoes: string[];
  opcoesBiodiversidade: string[];
}

export default function ResultsHeader({ 
  total, 
  opcoesFamilias, 
  opcoesBiomas,
  opcoesClasses,
  opcoesSubclasses,
  opcoesInstituicoes,
  opcoesBiodiversidade
}: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  // Captura os valores da URL para mostrar nas Tags
  const termoGlobal = searchParams.get('q');
  const filtroFamilia = searchParams.get('familia');
  const filtroBioma = searchParams.get('bioma');
  const filtroClasse = searchParams.get('classe');
  const filtroSubclasse = searchParams.get('subclasse');
  const filtroInstituicao = searchParams.get('instituicao');
  const filtroBiodiversidade = searchParams.get('biodiversidade');

  // Função auxiliar para criar o link de remoção de uma tag específica
  const getRemoveLink = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-4">
      
      {/* BARRA SUPERIOR: Contador + Tags + Botões */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        
        {/* Lado Esquerdo: Info e Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-bold text-slate-800">
            {total} <span className="font-normal text-slate-500 text-sm">resultados encontrados</span>
          </h2>
          
          <div className="hidden md:block w-px h-6 bg-slate-200 mx-2"></div>

          {/* --- ÁREA DAS TAGS (BADGES) --- */}

          {/* 1. Busca Global */}
          {termoGlobal && (
            <Link href={getRemoveLink('q')} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-slate-200">
              🔍 "{termoGlobal}" <XMarkIcon />
            </Link>
          )}

          {/* 2. Família */}
          {filtroFamilia && (
            <Link href={getRemoveLink('familia')} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-emerald-100">
              Família: {filtroFamilia} <XMarkIcon />
            </Link>
          )}

           {/* 3. Bioma */}
           {filtroBioma && (
            <Link href={getRemoveLink('bioma')} className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-orange-100">
              Bioma: {filtroBioma} <XMarkIcon />
            </Link>
          )}

          {/* 4. Classe */}
          {filtroClasse && (
            <Link href={getRemoveLink('classe')} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-blue-100">
              Classe: {filtroClasse} <XMarkIcon />
            </Link>
          )}

          {/* 5. Subclasse */}
          {filtroSubclasse && (
            <Link href={getRemoveLink('subclasse')} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-indigo-100">
              Subclasse: {filtroSubclasse} <XMarkIcon />
            </Link>
          )}

          {/* 6. Instituição */}
          {filtroInstituicao && (
            <Link href={getRemoveLink('instituicao')} className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-purple-100">
              Inst: {filtroInstituicao} <XMarkIcon />
            </Link>
          )}

          {/* 7. Biodiversidade */}
          {filtroBiodiversidade && (
            <Link href={getRemoveLink('biodiversidade')} className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition border border-teal-100">
              Bio: {filtroBiodiversidade} <XMarkIcon />
            </Link>
          )}
        </div>

        {/* Lado Direito: Ações */}
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setShowFilters(!showFilters)}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition border
               ${showFilters 
                 ? 'bg-slate-800 text-white border-slate-800' 
                 : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}
           >
             <AdjustIcon />
             {showFilters ? 'Fechar Filtros' : 'Editar Filtros'}
           </button>
           
           <Link href="/" className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase px-2">
             Limpar Tudo
           </Link>
        </div>
      </div>

      {/* ÁREA DO ACCORDION (GAVETA) */}
      {showFilters && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-300 mb-6">
          <AdvancedFilter 
            opcoesFamilias={opcoesFamilias} 
            opcoesBiomas={opcoesBiomas}
            opcoesClasse={opcoesClasses}
            opcoesSubclasse={opcoesSubclasses}
            opcoesInstituicao={opcoesInstituicoes}
            opcoesBiodiversidade={opcoesBiodiversidade}
            onSearch={() => setShowFilters(false)} // Fecha ao pesquisar
          />
        </div>
      )}
    </div>
  );
}