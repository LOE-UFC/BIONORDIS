'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Ícone visual
const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-6 h-6"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. Estado Local: Só guarda o texto na memória do componente, não na URL
  const [term, setTerm] = useState('');

  // Sincroniza o input com a URL apenas quando a página carrega pela primeira vez
  useEffect(() => {
    setTerm(searchParams.get('q') || '');
  }, [searchParams]);

  // 2. Função de Disparo: SÓ executa quando o formulário é submetido
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // <--- Impede o recarregamento padrão e o disparo automático
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (term.trim()) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    // Só aqui a URL muda e a pesquisa acontece
    router.push(`/?${params.toString()}`);
  };

  return (
    // O evento onSubmit aqui captura tanto o "Enter" no teclado quanto o clique no botão type="submit"
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative group">
      
      <div className="relative flex items-center">
        
        {/* Botão de Lupa (funciona como Submit ao clicar) */}
        <button 
          type="submit"
          className="absolute left-4 p-2 text-slate-400 hover:text-emerald-500 transition-colors z-10 cursor-pointer"
          title="Pesquisar"
        >
           <SearchIcon />
        </button>

        {/* Input de Texto */}
        <input
          type="text"
          placeholder="Search by name, family, biome..."
          value={term}
          // AQUI ESTÁ O SEGREDO: onChange só atualiza o estado local (setTerm), NUNCA chama handleSearch
          onChange={(e) => setTerm(e.target.value)}
          className="w-full py-5 pl-16 pr-6 bg-white rounded-full text-slate-600 placeholder:text-slate-400 outline-none border border-slate-100 focus:border-emerald-200 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-lg font-medium"
        />

      </div>
    </form>
  );
}