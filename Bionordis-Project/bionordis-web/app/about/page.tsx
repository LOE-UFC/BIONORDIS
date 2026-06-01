import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Globe, Dna, Network, Building2, FlaskConical, Users } from "lucide-react";
import '../home.css';

// Ícone de Usuário padronizado com a Home
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export default async function AboutPage() {
  const session = await auth();

  return (
    <div className="home-theme flex flex-col min-h-screen">
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
              src="/BIONORDIS-LOGO/2.png"
              alt="BIONORDIS Logo"
              width={250}
              height={70}
              className="brand-logo-img px-2 py-1 rounded-lg"
            />
          </Link>
          <nav className="desktop-nav">
            <Link href="/about" className="font-bold text-[#4fd1c5]">About</Link>
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

      <main className="custom-container flex-1 py-16 animate-in slide-in-from-bottom-4 duration-700 relative z-10">
        
        {/* HERO SECTION */}
        <section className="mt-16 mb-16 space-y-6 text-center">
            <div className="badge inline-block mx-auto mb-6">
                TRANSLATIONAL BIODISCOVERY
            </div>
            <h1 className="main-display text-4xl md:text-5xl">
                Refining Biomodels
            </h1>
            <p className="hero-text max-w-2xl mx-auto mt-6">
                Bionordis is the digital core of the <strong>INCT Bio²</strong> project, an initiative to position Brazilian research at the forefront of health innovation.
            </p>
        </section>

        <div className="space-y-10 max-w-5xl mx-auto">
            
            {/* CARD 1: ABOUT INCT */}
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#4fd1c5]"></div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#edf3f2] p-4 rounded-2xl text-[#0f3f49]">
                      <Network size={32} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#0f3f49] m-0">About INCT Bio²</h2>
                </div>
                <div className="prose prose-slate max-w-none text-[#1f2937] leading-relaxed text-lg">
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
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6">
                    <h3 className="text-2xl font-bold text-[#0f3f49] flex items-center gap-3">
                        <div className="bg-[#edf3f2] p-3 rounded-xl text-[#0f3f49]">
                          <Dna size={28} />
                        </div>
                        Cutting-Edge Tech
                    </h3>
                    <p className="text-[#1f2937] leading-relaxed">
                        Bio² proposes the development of advanced oncological biomodels, including genetically edited <strong>Oncopigs</strong>, for evaluating anticancer drugs. The initiative integrates:
                    </p>
                    <ul className="space-y-4 text-sm text-[#1f2937] font-medium mt-6">
                        <li className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-white/40 shadow-sm">
                            <span className="w-2.5 h-2.5 bg-[#4fd1c5] rounded-full shadow-[0_0_10px_#4fd1c5]"></span> Gene Editing
                        </li>
                        <li className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-white/40 shadow-sm">
                            <span className="w-2.5 h-2.5 bg-[#4fd1c5] rounded-full shadow-[0_0_10px_#4fd1c5]"></span> 3D Cell Culture & Tumoroids
                        </li>
                        <li className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-white/40 shadow-sm">
                            <span className="w-2.5 h-2.5 bg-[#4fd1c5] rounded-full shadow-[0_0_10px_#4fd1c5]"></span> Comparative Vet Oncology
                        </li>
                    </ul>
                </div>

                {/* CARD 3: GLOBAL NETWORK */}
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col">
                    <h3 className="text-2xl font-bold text-[#0f3f49] flex items-center gap-3">
                        <div className="bg-[#edf3f2] p-3 rounded-xl text-[#0f3f49]">
                          <Globe size={28} />
                        </div>
                        Global Network
                    </h3>
                    <div className="grid grid-cols-2 gap-5 flex-1 mt-4">
                        <div className="bg-[#edf3f2]/60 p-6 rounded-2xl text-center border border-[#edf3f2] flex flex-col justify-center">
                            <span className="block text-4xl font-black text-[#0f3f49]">64</span>
                            <span className="text-sm text-[#0f3f49]/70 font-bold uppercase tracking-wider mt-2 block">Researchers</span>
                        </div>
                        <div className="bg-[#edf3f2]/60 p-6 rounded-2xl text-center border border-[#edf3f2] flex flex-col justify-center">
                            <span className="block text-4xl font-black text-[#0f3f49]">14</span>
                            <span className="text-sm text-[#0f3f49]/70 font-bold uppercase tracking-wider mt-2 block">National Inst.</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[#1f2937]/80 leading-relaxed text-center font-medium">
                        Collaboration with 8 international institutions (USA, China, Uruguay, Switzerland, Portugal, Ireland) and Bio-Manguinhos (Fiocruz).
                    </p>
                </div>
            </div>

            {/* BLOCKQUOTE / LOE SECTION */}
            <div className="inct-panel mt-10 p-10 md:p-12 shadow-2xl">
                <div className="panel-glow"></div>
                <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                    <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
                        <div className="bg-white/10 inline-flex p-6 rounded-2xl text-white mb-6 backdrop-blur-sm">
                            <FlaskConical size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-white leading-tight">Experimental Oncology Lab (LOE)</h3>
                        <p className="text-sm font-medium text-white/70 mt-3 uppercase tracking-wider">Federal University of Ceará</p>
                    </div>
                    <div className="md:w-2/3 prose prose-slate text-white/90">
                        <p className="text-lg leading-relaxed">
                            This achievement represents a major milestone for the <strong>Experimental Oncology Laboratory (LOE)</strong>. It is the result of the collective effort of researchers, students, and collaborators committed to excellence.
                        </p>
                        <blockquote className="border-l-4 border-[#4fd1c5] pl-6 italic text-white bg-white/5 py-6 pr-6 rounded-r-2xl mt-8 shadow-inner">
                            "Our goal is to promote precision medicine and generate real impact on society."
                            <span className="block text-sm font-bold text-[#4fd1c5] mt-4 not-italic uppercase tracking-widest">— Prof. Cláudia do Ó Pessoa</span>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="modern-footer mt-auto relative z-10">
        <div className="custom-container footer-content">
          <span className="copy">© 2026 Bionordis Platform</span>
          <div className="footer-line"></div>
        </div>
      </footer>
    </div>
  );
}
