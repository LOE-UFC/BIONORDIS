import Image from 'next/image';
import Link from 'next/link';
import { getFilterOptions, getMoleculasPaginadas } from '@/lib/db'; 
import Search from '@/components/Search';
import AdvancedFilter from '@/components/AdvancedFilter';
import ResultsHeader from '@/components/ResultsHeader';
import Pagination from '@/components/Pagination';
import { auth } from "@/auth";
import SystemGuide from "@/components/SystemGuide";

// Inline icons using the new primary dark teal color
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1c5563]"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>;
const MoleculeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const PlantIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;

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
    // Base background applied here
    <div className="min-h-screen bg-[#cfd4c1] font-sans text-slate-800 flex flex-col">
      
      {/* TOP HEADER - Escuro para Alto Contraste */}
      <header className="border-b border-[#2e6655]/40 py-3 sticky top-0 bg-[#1c5563]/95 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          
          <Link href="/" className="hover:opacity-80 transition-opacity">
            {/* Fundo branco arredondado em volta da logo para garantir que o JPEG não fique feio no fundo escuro */}
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm">
              <Image 
                src="/logos/Logo-LOE.jpeg" 
                alt="Bionordis Logo" 
                width={128} 
                height={38} 
                className="h-8 w-auto object-contain" 
                priority 
              />
            </div>
          </Link>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-6 text-sm font-semibold text-[#cfd4c1]">
              <Link href="/about" className="hover:text-white transition-colors">About the Project</Link>
              <Link href="#" className="hover:text-white transition-colors">Team</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-3 border-l border-[#2e6655] pl-6">
              <Link href={session?.user ? "/profile" : "/login"} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border 
                  ${session?.user 
                    ? "bg-[#cfd4c1] text-[#1c5563] border-transparent hover:bg-white" 
                    : "bg-[#1c5563] text-[#cfd4c1] border-[#2e6655] hover:bg-[#2e6655] hover:text-white"}`}>
                  
                  {/* Ícone de Usuário embutido para herdar a cor do texto automaticamente */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold hidden sm:block">
                    {session?.user ? session.user.name?.split(' ')[0] : "Restricted Access"}
                  </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-6 flex flex-col">
        <SystemGuide />
      
        {!isSearching ? (
          <div className="flex flex-col gap-16 py-8 animate-in fade-in duration-700">
            
            {/* SECTION 1: HERO & MAIN SEARCH (Integrado e Limpo) */}
            <section className="flex flex-col items-center text-center max-w-4xl mx-auto w-full pt-8 pb-4">
              <span className="text-[#2e6655] font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">
                Chemoinformatics Platform
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1c5563] mb-4 leading-tight tracking-tight">
                BIONORDIS
                <span className="text-[#2e6655] text-2xl md:text-3xl lg:text-4xl font-medium mt-2 block">
                  Bank of Molecules and Biodiversity of the Northeast
                </span>
              </h1>
              
              <p className="text-[#1c5563]/80 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10">
                Explore the digital repository of bioactive compounds, physicochemical properties from the Brazilian flora and more.
              </p>

              {/* Search Bar - Agora integrada no layout sem a caixa escura */}
              <div className="w-full max-w-3xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white">
                <Search />
              </div>
            </section>

            {/* SECTION 2: NUMBERS / IMPACT */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto w-full">
              {[
                { label: "Cataloged Molecules", value: "+1,200", icon: <MoleculeIcon /> },
                { label: "Botanical Families", value: "45", icon: <PlantIcon /> },
                { label: "Biological Assays", value: "+5,000", icon: <MoleculeIcon /> },
                { label: "Cell Lines", value: "12", icon: <PlantIcon /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[#2e6655] mb-3">{stat.icon}</div>
                  <h3 className="text-3xl font-black text-[#1c5563] mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                </div>
              ))}
            </section>

            {/* SECTION 3: QUICK NAVIGATION BY CLASSES */}
            <section className="max-w-6xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1c5563]">Explore by Chemical Class</h2>
                <Link href="/?browse=true" className="text-[#2e6655] font-bold text-sm hover:underline">View entire catalog &rarr;</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Alkaloids", desc: "Nitrogenous compounds of plant origin." },
                  { title: "Flavonoids", desc: "Natural pigments with antioxidant action." },
                  { title: "Terpenoids", desc: "Isoprene derivatives, essential oils." },
                  { title: "Steroids", desc: "Lipids with a tetracyclic core." },
                ].map((cat, i) => (
                  <Link href={`/?classe=${cat.title}`} key={i} className="bg-white p-6 rounded-3xl border border-transparent hover:border-[#2e6655]/30 hover:shadow-lg transition-all group">
                    <h3 className="font-bold text-[#1c5563] text-lg mb-2 group-hover:text-[#2e6655]">{cat.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* SECTION 4: ADVANCED SEARCH / DETAILED FILTERS */}
            <section className="max-w-6xl mx-auto w-full mb-10">
               <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#2e6655]"></div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1c5563] mb-2">Advanced Scientific Search</h2>
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

          </div>
        ) : (
          /* =========================================================
             RESULTS PAGE STARTS HERE
             ========================================================= */
          <div className="animate-in slide-in-from-bottom-4 duration-500 mt-4">
            
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
               <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#1c5563]/20 mt-6 shadow-sm">
                 <p className="text-[#1c5563] text-lg font-medium">
                    {paginaAtual > 1 
                      ? `No results on page ${paginaAtual}.` 
                      : 'No results found for these filters.'}
                 </p>
                 <Link href="/" className="text-[#2e6655] font-bold hover:underline mt-3 inline-block">Clear Search and Try Again</Link>
               </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  {resultado.moleculas.map((mol: any) => (
                    <Link href={`/molecula/${mol.id}`} key={mol.id} className="block group h-full">
                      <div className="bg-white rounded-2xl shadow-sm border border-transparent p-6 hover:shadow-xl hover:border-[#2e6655]/40 hover:ring-1 hover:ring-[#2e6655]/40 transition-all duration-300 h-full hover:-translate-y-1.5 cursor-pointer flex flex-col">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0
                            ${mol.smiles ? 'bg-[#cfd4c1]/40 text-[#2e6655]' : 'bg-slate-100 text-slate-400'}`}>
                            {mol.smiles ? '⚗️' : '🌿'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-[#1c5563] truncate text-lg group-hover:text-[#2e6655] transition-colors">{mol.nome}</h4>
                            <p className="text-sm text-slate-400 italic truncate">{mol.nome_cientifico || 'Species not specified'}</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-500 space-y-3 pt-4 border-t border-slate-100 mt-auto">
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Class</span>
                             <span className="font-semibold text-[#1c5563] bg-[#cfd4c1]/30 px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.classe || '-'}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Family</span>
                             <span className="font-semibold text-[#1c5563] bg-[#cfd4c1]/30 px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.familia || '-'}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="font-medium">Biome</span>
                             <span className="font-semibold text-[#1c5563] bg-[#cfd4c1]/30 px-2.5 py-1 rounded-md truncate max-w-[130px]">{mol.bioma || '-'}</span>
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
    </div>
  );
}