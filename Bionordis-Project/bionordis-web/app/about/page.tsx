import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Globe, Dna, Network, Building2, FlaskConical, Users } from "lucide-react";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-700"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
);

export default async function AboutPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      
      <header className="border-b border-slate-100 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/BIONORDIS-LOGO/2.png"
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
              <Link href="/about" className="text-emerald-600 font-bold">About</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">Team</Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">How to Cite</Link>
            </nav>
            <Link 
                href={session?.user ? "/profile" : "/login"} 
                className={`p-2 rounded-full transition-colors ${
                  session?.user ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "hover:bg-slate-100 text-slate-600"
                }`}
            >
                <UserIcon />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <section className="mb-16 space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Translational Biodiscovery <br/>
                <span className="text-emerald-600">& Biomodels</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Bionordis is the digital core of the <strong>INCT T-Bio2</strong> project, an initiative to position Brazilian research at the forefront of health innovation.
            </p>
        </section>

        <div className="space-y-16">
            
            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                    <Network className="text-emerald-600" size={32} />
                    <h2 className="text-2xl font-bold text-slate-800 m-0">About INCT T-Bio2</h2>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p>
                        Coordinated by <strong>Prof. Cláudia do Ó Pessoa</strong> (UFC/NPDM) in partnership with <strong>Prof. Maria Lucia Zaidan Dagli</strong> (USP), the <em>INCT T-Bio2: Translational Biodiscovery and Biomodels</em> establishes an innovative preclinical platform.
                    </p>
                    <p>
                        The project integrates cutting-edge science and international collaboration to accelerate the development of effective and personalized cancer therapies. Our goal is to drive the development of new <strong>Active Pharmaceutical Ingredients (IFAs)</strong>, connecting academic production directly to the national pharmaceutical industry while valorizing Brazilian biodiversity as an undeniable source of promising molecules.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Dna size={24} className="text-purple-600" />
                        Cutting-Edge Technology
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        T-Bio2 proposes the development of advanced oncological biomodels, including genetically edited <strong>Oncopigs</strong>, for evaluating anticancer drugs. The initiative integrates:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600 font-medium">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Gene Editing
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> 3D Cell Culture & Tumoroids
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Comparative Veterinary Oncology
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <Globe size={24} className="text-blue-600" />
                        Global Network
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                            <span className="block text-2xl font-extrabold text-slate-900">64</span>
                            <span className="text-xs text-slate-500 font-bold uppercase">Researchers</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                            <span className="block text-2xl font-extrabold text-slate-900">14</span>
                            <span className="text-xs text-slate-500 font-bold uppercase">National Inst.</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 leading-relaxed text-center">
                        Collaboration with 8 international institutions (USA, China, Uruguay, Switzerland, Portugal, Ireland) and Bio-Manguinhos (Fiocruz).
                    </p>
                </div>
            </div>

            <hr className="border-slate-200" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 text-center md:text-left">
                    <div className="bg-emerald-50 inline-flex p-4 rounded-2xl text-emerald-700 mb-4">
                        <FlaskConical size={40} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Experimental Oncology Lab (LOE)</h3>
                    <p className="text-sm text-slate-500">Federal University of Ceará</p>
                </div>
                <div className="md:w-2/3 prose prose-slate text-slate-600">
                    <p>
                        This achievement represents a major milestone for the <strong>Experimental Oncology Laboratory (LOE)</strong>. It is the result of the collective effort of researchers, students, and collaborators committed to excellence.
                    </p>
                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-700 bg-slate-50 py-2 pr-2 rounded-r-lg">
                        "Our goal is to promote precision medicine and generate real impact on society."
                        <span className="block text-xs font-bold text-emerald-700 mt-2 not-italic">— Prof. Cláudia do Ó Pessoa</span>
                    </blockquote>
                </div>
            </div>

            <div className="pt-8">
                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Strategic Partners</p>
                <div className="flex flex-wrap justify-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                     <span className="px-4 py-2 bg-slate-100 rounded text-slate-600 font-bold text-sm border border-slate-200">UFC</span>
                     <span className="px-4 py-2 bg-slate-100 rounded text-slate-600 font-bold text-sm border border-slate-200">USP</span>
                     <span className="px-4 py-2 bg-slate-100 rounded text-slate-600 font-bold text-sm border border-slate-200">Fiocruz / Bio-Manguinhos</span>
                     <span className="px-4 py-2 bg-slate-100 rounded text-slate-600 font-bold text-sm border border-slate-200">CNPq</span>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}       