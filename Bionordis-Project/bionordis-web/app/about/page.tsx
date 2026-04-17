import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Globe, Dna, Network, Building2, FlaskConical, Users } from "lucide-react";

// Ícone de Usuário padronizado com a Home
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export default async function AboutPage() {
  const session = await auth();

  return (
    // Fundo padronizado com a Home
    <div className="min-h-screen bg-[#cfd4c1] text-slate-800 flex flex-col">
      
      {/* TOP HEADER - Exatamente igual ao da Home */}
      <header className="border-b border-[#2e6655]/40 py-3 sticky top-0 bg-[#1c5563]/95 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          
          <Link href="/" className="hover:opacity-80 transition-opacity">
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
              {/* O link "About" fica branco para indicar que estamos nesta página */}
              <Link href="/about" className="text-white font-bold transition-colors">About the Project</Link>
              <Link href="#" className="hover:text-white transition-colors">Team</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-3 border-l border-[#2e6655] pl-6">
              <Link href={session?.user ? "/profile" : "/login"} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border 
                  ${session?.user 
                    ? "bg-[#cfd4c1] text-[#1c5563] border-transparent hover:bg-white" 
                    : "bg-[#1c5563] text-[#cfd4c1] border-[#2e6655] hover:bg-[#2e6655] hover:text-white"}`}>
                  <UserIcon />
                  <span className="text-sm font-bold hidden sm:block">
                    {session?.user ? session.user.name?.split(' ')[0] : "Restricted Access"}
                  </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HERO SECTION */}
        <section className="mb-16 space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-[#1c5563] tracking-tight leading-tight">
                Translational Biodiscovery <br/>
                <span className="text-[#2e6655]">Refining Biomodels</span>
            </h1>
            <p className="text-lg text-[#1c5563]/80 font-medium leading-relaxed max-w-2xl mx-auto">
                Bionordis is the digital core of the <strong>INCT Bio²</strong> project, an initiative to position Brazilian research at the forefront of health innovation.
            </p>
        </section>

        <div className="space-y-10">
            
            {/* CARD 1: ABOUT INCT */}
            <div className="bg-white p-8 rounded-3xl border border-transparent shadow-sm hover:shadow-md transition-shadow space-y-6">
                <div className="flex items-center gap-4">
                    <div className="bg-[#cfd4c1]/40 p-3 rounded-2xl text-[#2e6655]">
                      <Network size={28} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1c5563] m-0">About INCT Bio²</h2>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p>
                        Coordinated by <strong>Prof. Cláudia do Ó Pessoa</strong> (UFC/NPDM) in partnership with <strong>Prof. Maria Lucia Zaidan Dagli</strong> (USP), the <em>INCT Bio²: Translational Biodiscovery and Biomodels</em> establishes an innovative preclinical platform.
                    </p>
                    <p>
                        The project integrates cutting-edge science and international collaboration to accelerate the development of effective and personalized cancer therapies. Our goal is to drive the development of new <strong>Active Pharmaceutical Ingredients (IFAs)</strong>, connecting academic production directly to the national pharmaceutical industry while valorizing Brazilian biodiversity as an undeniable source of promising molecules.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CARD 2: TECHNOLOGY */}
                <div className="bg-white p-8 rounded-3xl border border-transparent shadow-sm hover:shadow-md transition-shadow space-y-6">
                    <h3 className="text-xl font-bold text-[#1c5563] flex items-center gap-3">
                        <div className="bg-[#cfd4c1]/40 p-2.5 rounded-xl text-[#2e6655]">
                          <Dna size={24} />
                        </div>
                        Cutting-Edge Tech
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        Bio² proposes the development of advanced oncological biomodels, including genetically edited <strong>Oncopigs</strong>, for evaluating anticancer drugs. The initiative integrates:
                    </p>
                    <ul className="space-y-3 text-sm text-slate-600 font-medium">
                        <li className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <span className="w-2 h-2 bg-[#2e6655] rounded-full"></span> Gene Editing
                        </li>
                        <li className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <span className="w-2 h-2 bg-[#2e6655] rounded-full"></span> 3D Cell Culture & Tumoroids
                        </li>
                        <li className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <span className="w-2 h-2 bg-[#2e6655] rounded-full"></span> Comparative Vet Oncology
                        </li>
                    </ul>
                </div>

                {/* CARD 3: GLOBAL NETWORK */}
                <div className="bg-white p-8 rounded-3xl border border-transparent shadow-sm hover:shadow-md transition-shadow space-y-6">
                    <h3 className="text-xl font-bold text-[#1c5563] flex items-center gap-3">
                        <div className="bg-[#cfd4c1]/40 p-2.5 rounded-xl text-[#2e6655]">
                          <Globe size={24} />
                        </div>
                        Global Network
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#cfd4c1]/20 p-5 rounded-2xl text-center border border-[#cfd4c1]/40">
                            <span className="block text-3xl font-black text-[#1c5563]">64</span>
                            <span className="text-xs text-[#2e6655] font-bold uppercase tracking-wider mt-1 block">Researchers</span>
                        </div>
                        <div className="bg-[#cfd4c1]/20 p-5 rounded-2xl text-center border border-[#cfd4c1]/40">
                            <span className="block text-3xl font-black text-[#1c5563]">14</span>
                            <span className="text-xs text-[#2e6655] font-bold uppercase tracking-wider mt-1 block">National Inst.</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed text-center">
                        Collaboration with 8 international institutions (USA, China, Uruguay, Switzerland, Portugal, Ireland) and Bio-Manguinhos (Fiocruz).
                    </p>
                </div>
            </div>

            {/* BLOCKQUOTE / LOE SECTION */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-transparent shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
                        <div className="bg-[#cfd4c1]/40 inline-flex p-5 rounded-2xl text-[#1c5563] mb-5">
                            <FlaskConical size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1c5563] leading-tight">Experimental Oncology Lab (LOE)</h3>
                        <p className="text-sm font-medium text-slate-400 mt-2">Federal University of Ceará</p>
                    </div>
                    <div className="md:w-2/3 prose prose-slate text-slate-600">
                        <p>
                            This achievement represents a major milestone for the <strong>Experimental Oncology Laboratory (LOE)</strong>. It is the result of the collective effort of researchers, students, and collaborators committed to excellence.
                        </p>
                        <blockquote className="border-l-4 border-[#2e6655] pl-5 italic text-slate-600 bg-[#cfd4c1]/20 py-4 pr-4 rounded-r-xl mt-6">
                            "Our goal is to promote precision medicine and generate real impact on society."
                            <span className="block text-sm font-bold text-[#1c5563] mt-3 not-italic">— Prof. Cláudia do Ó Pessoa</span>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}