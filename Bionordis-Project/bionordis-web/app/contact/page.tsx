import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";

// Ícone de Usuário (Padrão do Sistema)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-700"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
);

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      
      {/* --- HEADER PADRÃO DO SISTEMA --- */}
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
              <Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">Team</Link>
              {/* Link Contact Ativo (Bold/Emerald) */}
              <Link href="/contact" className="text-emerald-600 font-bold">Contact</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">How to Cite</Link>
            </nav>
            <Link 
                href={session?.user ? "/profile" : "/login"} 
                className={`p-2 rounded-full transition-colors ${
                  session?.user ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "hover:bg-slate-100 text-slate-600"
                }`}
                title={session?.user ? `Logged in as ${session.user.name}` : "Restricted Access"}
              >
                <UserIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Have questions about our data? Interested in academic collaboration? We are here to help.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Lado Esquerdo: Informações de Contato */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare size={20} className="text-emerald-600"/>
                        Contact Information
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Email</h3>
                                <p className="text-sm text-slate-500 mb-1">For general inquiries and data submission.</p>
                                <a href="mailto:contact@bionordis.ufc.br" className="text-emerald-600 font-bold hover:underline">
                                    loe@ufc.br
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Laboratory Location</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Laboratory of Experimental Oncology<br/>
                                    Núcleo de Pesquisa e Desenvolvimento de Medicamentos (NPDM)<br/>
                                    Rua Coronel Nunes de Melo, Nº 1000, Rodolfo Teófilo<br/>
                                    Fortaleza - CE, Brazil<br/>
                                    ZIP: 60430-275
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Phone</h3>
                                <p className="text-sm text-slate-500">Mon-Fri from 8am to 6pm.</p>
                                <span className="text-slate-700 font-mono text-sm">+55(85)3366-8337</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Lado Direito: Formulário (Visual apenas) */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                            <input type="text" placeholder="Your name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                            <input type="email" placeholder="you@university.edu" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-600">
                            <option>Academic Collaboration</option>
                            <option>Report Data Issue</option>
                            <option>General Inquiry</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                        <textarea rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"></textarea>
                    </div>

                    <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2">
                        Send Message
                        <Send size={16} />
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 mt-4">
                        This form sends a direct email to our research team. We usually respond within 48 hours.
                    </p>
                </form>
            </div>

        </div>
      </main>
    </div>
  );
}