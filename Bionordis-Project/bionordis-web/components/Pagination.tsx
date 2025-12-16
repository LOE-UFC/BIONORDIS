'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  paginaAtual: number;
  totalPaginas: number;
}

export default function Pagination({ paginaAtual, totalPaginas }: Props) {
  const searchParams = useSearchParams();

  // Função para gerar o link mantendo os filtros atuais
  const criarLink = (novaPagina: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', novaPagina.toString());
    return `/?${params.toString()}`;
  };

  if (totalPaginas <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Botão Anterior */}
      {paginaAtual > 1 ? (
        <Link 
          href={criarLink(paginaAtual - 1)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm font-medium"
        >
          &larr; Last
        </Link>
      ) : (
        <span className="px-4 py-2 border border-slate-100 rounded-lg text-slate-300 cursor-not-allowed">
          &larr; Last
        </span>
      )}

      <span className="text-sm font-bold text-slate-500">
        Page <span className="text-emerald-600">{paginaAtual}</span> of {totalPaginas}
      </span>

      {/* Botão Próximo */}
      {paginaAtual < totalPaginas ? (
        <Link 
          href={criarLink(paginaAtual + 1)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm font-medium"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 border border-slate-100 rounded-lg text-slate-300 cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </div>
  );
}