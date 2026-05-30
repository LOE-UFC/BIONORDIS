import Image from 'next/image';
import Link from 'next/link';
import { getFilterOptions, getMoleculasPaginadas } from '@/lib/db'; 
import Search from '@/components/Search';
import AdvancedFilter from '@/components/AdvancedFilter';
import ResultsHeader from '@/components/ResultsHeader';
import Pagination from '@/components/Pagination';
import { auth } from "@/auth";
import SystemGuide from "@/components/SystemGuide";
import HomeShowcase from '@/components/HomeShowcase';

import './home.css';

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
    q?: string; familia?: string; bioma?: string; classe?: string; subclasse?: string; instituicao?: string; biodiversidade?: string; page?: string; browse?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();

  const filtros = {
    q: searchParams.q || '', familia: searchParams.familia || '', bioma: searchParams.bioma || '', classe: searchParams.classe || '', subclasse: searchParams.subclasse || '', instituicao: searchParams.instituicao || '', biodiversidade: searchParams.biodiversidade || '',
  };

  const paginaAtual = Number(searchParams.page) || 1;
  const itensPorPagina = 20;
  
  const isSearching = Object.values(filtros).some(valor => valor !== '') || searchParams.browse === 'true';

  const opcoesFiltros = await getFilterOptions();

  let resultado: { moleculas: Molecula[]; total: number; paginas: number } = { moleculas: [], total: 0, paginas: 0 };
  if (isSearching) {
    resultado = await getMoleculasPaginadas(filtros, paginaAtual, itensPorPagina);
  }

  return (
    <div className="home-theme">
      {/* Background elements */}
      <div className="bg-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* HEADER */}
      <header className="glass-header">
        <div className="custom-container nav-wrapper">
          <Link href="/" className="brand">
            <Image
              src="/logos/Logo-LOE.jpeg"
              alt="BIONORDIS Logo"
              width={128}
              height={38}
              className="brand-logo-img bg-white px-2 py-1 rounded-lg"
            />
          </Link>
          <nav className="desktop-nav">
            <Link href="/about">About</Link>
            <Link href="#">Research</Link>
            <Link href="#">Database</Link>
            <Link href="#">Team</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Link href={session?.user ? "/profile" : "/login"}>
            <button className="btn-auth">
              {session?.user ? session.user.name?.split(' ')[0] : "Restricted Access"}
            </button>
          </Link>
        </div>
      </header>

      <main className="custom-container">
        <SystemGuide />
        {!isSearching ? (
          <>
            {/* HERO SECTION */}
            <section className="hero-section">
              <div className="badge">
                NEXT GENERATION CHEMOINFORMATICS PLATFORM
              </div>
              <h1 className="main-display">
                BIONORDIS
              </h1>
              <h2 className="hero-subtitle">
                Bank of Molecules and Biodiversity of the Northeast
              </h2>
              <p className="hero-text">
                Explore a futuristic repository of bioactive compounds,
                physicochemical properties, biodiversity analytics and
                advanced molecular intelligence from Brazilian flora.
              </p>

              <div className="hero-actions">
                <Link href="/?browse=true">
                  <button className="primary-btn">
                    Explore Database
                  </button>
                </Link>
                <button className="secondary-btn">
                  Watch Overview
                </button>
              </div>

              {/* MODERN SEARCH */}
              <div className="mt-12 w-full max-w-2xl mx-auto drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
                <Search />
              </div>
            </section>

            {/* ADVANCED FILTER SECTION */}
            <section className="my-12">
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-lg relative overflow-hidden border border-white/40">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#4fd1c5]"></div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#0f3f49] mb-2">Advanced Scientific Search</h2>
                  <p className="text-slate-500 text-sm">Combine multiple biological and botanical parameters to refine your search.</p>
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
            </section>

            {/* SHOWCASE SECTION */}
            <HomeShowcase />

            {/* PANEL */}
            <section className="inct-panel">
              <div className="panel-glow"></div>
              <div className="inct-content relative z-10">
                <div className="inct-header">
                  <div className="inct-icon">🧬</div>
                  <h2>About INCT Bio²</h2>
                </div>
                <p>
                  Coordinated by
                  <strong> Prof. Cláudia do Ó Pessoa</strong> (UFC/NPDM)
                  and
                  <strong> Prof. Maria Lucia Zaidan Dagli</strong> (USP).
                </p>
                <div className="inct-stats">
                  <div className="mini-stat">
                    <strong>64</strong> Researchers
                  </div>
                  <div className="mini-stat">
                    <strong>14</strong> National Institutes
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* RESULTS PAGE */
          <div className="animate-in slide-in-from-bottom-4 duration-500 mt-8 mb-20 relative z-10">
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
               <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-dashed border-[#0f3f49]/20 mt-6 shadow-sm">
                 <p className="text-[#0f3f49] text-lg font-medium">
                    {paginaAtual > 1 
                      ? `No results on page ${paginaAtual}.` 
                      : 'No results found for these filters.'}
                 </p>
                 <Link href="/" className="text-[#4fd1c5] font-bold hover:underline mt-3 inline-block">Clear Search and Try Again</Link>
               </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  {resultado.moleculas.map((mol: any) => (
                    <Link href={`/molecula/${mol.id}`} key={mol.id} className="block group h-full">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-transparent p-6 hover:shadow-xl hover:border-[#4fd1c5]/40 hover:ring-1 hover:ring-[#4fd1c5]/40 transition-all duration-300 h-full hover:-translate-y-1.5 cursor-pointer flex flex-col">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0
                            ${mol.smiles ? 'bg-[#edf3f2] text-[#4fd1c5]' : 'bg-slate-100 text-slate-400'}`}>
                            {mol.smiles ? '⚗️' : '🌿'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-[#0f3f49] truncate text-lg group-hover:text-[#4fd1c5] transition-colors">{mol.nome}</h4>
                            <p className="text-sm text-slate-500 italic truncate">{mol.nome_cientifico || 'Species not specified'}</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-600 space-y-3 pt-4 border-t border-slate-100 mt-auto">
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Class</span>
                             <span className="font-semibold text-[#0f3f49] bg-[#edf3f2] px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.classe || '-'}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Family</span>
                             <span className="font-semibold text-[#0f3f49] bg-[#edf3f2] px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.familia || '-'}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Biome</span>
                             <span className="font-semibold text-[#0f3f49] bg-[#edf3f2] px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.bioma || '-'}</span>
                           </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-12 pb-10">
                  <Pagination paginaAtual={paginaAtual} totalPaginas={resultado.paginas} />
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="modern-footer">
        <div className="custom-container footer-content">
          <span className="copy">© 2026 Bionordis Platform</span>
          <div className="footer-line"></div>
        </div>
      </footer>
    </div>
  );
}
