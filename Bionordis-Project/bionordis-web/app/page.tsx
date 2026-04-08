import Image from 'next/image';
import Link from 'next/link';
import { getFilterOptions, getMoleculasPaginadas } from '@/lib/db'; 
import Search from '@/components/Search';
import AdvancedFilter from '@/components/AdvancedFilter';
import ResultsHeader from '@/components/ResultsHeader';
import Pagination from '@/components/Pagination';
import { auth } from "@/auth";
import SystemGuide from "@/components/SystemGuide";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-700"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
);

interface Molecula {
  id: number;
  nome: string;
  smiles: string | null;
  nome_cientifico: string | null;
  familia: string | null;
  bioma: string | null;
  classe: string | null;
}

export default async function Home(props: {
  searchParams: Promise<{ 
    q?: string; 
    familia?: string; 
    bioma?: string;
    classe?: string;
    subclasse?: string;
    instituicao?: string;
    biodiversidade?: string;
    page?: string; 
    browse?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();

  const filtros = {
    q: searchParams.q || '',
    familia: searchParams.familia || '',
    bioma: searchParams.bioma || '',
    classe: searchParams.classe || '',
    subclasse: searchParams.subclasse || '',
    instituicao: searchParams.instituicao || '',
    biodiversidade: searchParams.biodiversidade || '',
  };

  const paginaAtual = Number(searchParams.page) || 1;
  const itensPorPagina = 20;
  
  const isSearching = Object.values(filtros).some(valor => valor !== '') || searchParams.browse === 'true';

  const opcoesFiltros = await getFilterOptions();

  let resultado: { moleculas: Molecula[]; total: number; paginas: number } = { 
    moleculas: [], 
    total: 0, 
    paginas: 0 
  };

  if (isSearching) {
    resultado = await getMoleculasPaginadas(filtros, paginaAtual, itensPorPagina);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      
      <header className="border-b border-slate-100 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/logos/Logo-LOE.jpeg"
                alt="Bionordis Logo"
                width={1280}
                height={376}
                className="h-12 w-auto md:h-16 object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link>
              <Link href="#" className="hover:text-emerald-600">Team</Link>
              <Link href="/contact" className="hover:text-emerald-600">Contact</Link>
              <Link href="#" className="hover:text-emerald-600">How to Cite</Link>
            </nav>
            <Link 
                href={session?.user ? "/profile" : "/login"} 
                className={`p-2 rounded-full transition-colors ${
                  session?.user ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "hover:bg-slate-100 text-slate-600"
                }`}
                title={session?.user ? `Logged as ${session.user.name}` : "Restrict Acess"}
              >
                <UserIcon />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-10">

      <div className="pb-4">
          <SystemGuide />
      </div>
      
        {!isSearching ? (
          <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-500">
            <div className="text-center mb-10 px-4">
              <h2 className="text-slate-500 font-medium mb-6">Search All</h2>
                <Search />
            </div>

            <div className="flex items-center justify-center gap-4 my-10">
              <div className="h-[1px] bg-slate-200 w-full max-w-[100px]"></div>
              <span className="text-slate-400 text-sm font-medium uppercase">Or</span>
              <div className="h-[1px] bg-slate-200 w-full max-w-[100px]"></div>
            </div>

            <AdvancedFilter 
              opcoesFamilias={opcoesFiltros.familias} 
              opcoesBiomas={opcoesFiltros.biomas} 
              opcoesClasse={opcoesFiltros.classes}        
              opcoesSubclasse={opcoesFiltros.subclasses}  
              opcoesInstituicao={opcoesFiltros.instituicoes}
              opcoesBiodiversidade={opcoesFiltros.biodiversidades} 
            />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            
            <ResultsHeader 
              total={resultado.total} 
              opcoesFamilias={opcoesFiltros.familias}
              opcoesBiomas={opcoesFiltros.biomas}
              opcoesClasses={opcoesFiltros.classes}        
              opcoesSubclasses={opcoesFiltros.subclasses}  
              opcoesInstituicoes={opcoesFiltros.instituicoes}
              opcoesBiodiversidade={opcoesFiltros.biodiversidades}
            />

            {resultado.moleculas.length === 0 ? (
               <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mt-6">
                 <p className="text-slate-500 text-lg">
                    {paginaAtual > 1 
                      ? `Nenhum resultado na página ${paginaAtual}.` 
                      : 'Nenhum resultado encontrado para essa busca.'}
                 </p>
                 <Link href="/" className="text-emerald-600 font-bold hover:underline mt-2 inline-block">Clear Filters</Link>
               </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                  {resultado.moleculas.map((mol: any) => (
                    <Link href={`/molecula/${mol.id}`} key={mol.id} className="block group h-full">
                      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-lg hover:border-emerald-100 transition-all h-full hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner
                            ${mol.smiles ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                            {mol.smiles ? '⚗️' : '🌿'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-800 truncate text-base group-hover:text-emerald-700 transition-colors">{mol.nome}</h4>
                            <p className="text-xs text-slate-500 italic truncate">{mol.nome_cientifico || 'Espécie não informada'}</p>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 space-y-2 pt-3 border-t border-slate-50">
                           <div className="flex justify-between">
                             <span>Family</span>
                             <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[120px]">{mol.familia || '-'}</span>
                           </div>
                           <div className="flex justify-between">
                             <span>Biome</span>
                             <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[120px]">{mol.bioma || '-'}</span>
                           </div>
                           <div className="flex justify-between">
                             <span>Biodiversity</span>
                             <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[120px]">{mol.biodiversidade || '-'}</span>
                           </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Pagination 
                  paginaAtual={paginaAtual} 
                  totalPaginas={resultado.paginas} 
                />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}