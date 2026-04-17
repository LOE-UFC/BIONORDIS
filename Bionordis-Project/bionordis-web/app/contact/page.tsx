"use client"; // Precisamos do 'use client' para o botão rodar o JavaScript do mailto

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
// Assumindo que a sessão de login será tratada noutro lugar, ou pode reintroduzir o auth() se mudar este componente para um misto de server/client.
// Para simplificar e manter o código a funcionar com o mailto, removi a chamada do servidor 'auth()'.

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export default function ContactPage() {
  
  // Função mágica que pega os dados do formulário e abre o Email
  const handleMailTo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede a página de recarregar
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Constrói o corpo do email formatado
    const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}
    `;

    // Converte textos com espaços e quebras de linha num formato que o link mailto entenda
    const mailtoLink = `mailto:loe@ufc.br?subject=${encodeURIComponent(`[Bionordis Contact] ${subject}`)}&body=${encodeURIComponent(emailBody)}`;

    // Abre o programa de email do utilizador
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-[#cfd4c1] text-slate-800 flex flex-col">
      
      {/* TOP HEADER */}
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
              <Link href="/about" className="hover:text-white transition-colors">About the Project</Link>
              <Link href="#" className="hover:text-white transition-colors">Team</Link>
              <Link href="/contact" className="text-white font-bold transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-3 border-l border-[#2e6655] pl-6">
              <Link href="/login" 
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all border bg-[#1c5563] text-[#cfd4c1] border-[#2e6655] hover:bg-[#2e6655] hover:text-white">
                  <UserIcon />
                  <span className="text-sm font-bold hidden sm:block">
                    Area Restrita
                  </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#1c5563] tracking-tight">Get in Touch</h1>
            <p className="text-lg text-[#1c5563]/80 font-medium max-w-2xl mx-auto">
                Have questions about our data? Interested in academic collaboration? We are here to help.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* LADO ESQUERDO: INFO */}
            <div className="space-y-8">
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-transparent shadow-sm hover:shadow-md transition-shadow space-y-8 h-full">
                    <h2 className="text-xl font-bold text-[#1c5563] flex items-center gap-3">
                        <div className="bg-[#cfd4c1]/40 p-2.5 rounded-xl text-[#2e6655]">
                            <MessageSquare size={24} />
                        </div>
                        Contact Information
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#cfd4c1]/40 p-3.5 rounded-2xl text-[#2e6655]">
                                <Mail size={22} />
                            </div>
                            <div className="pt-1">
                                <h3 className="font-bold text-[#1c5563] text-sm mb-0.5">Email</h3>
                                <p className="text-sm text-slate-500 mb-1">For general inquiries and data submission.</p>
                                <a href="mailto:loe@ufc.br" className="text-[#2e6655] font-bold hover:underline">
                                    loe@ufc.br
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#cfd4c1]/40 p-3.5 rounded-2xl text-[#2e6655]">
                                <MapPin size={22} />
                            </div>
                            <div className="pt-1">
                                <h3 className="font-bold text-[#1c5563] text-sm mb-0.5">Laboratory Location</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Laboratory of Experimental Oncology<br/>
                                    NPDM<br/>
                                    Rua Coronel Nunes de Melo, Nº 1000<br/>
                                    Fortaleza - CE, Brazil<br/>
                                    ZIP: 60430-275
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#cfd4c1]/40 p-3.5 rounded-2xl text-[#2e6655]">
                                <Phone size={22} />
                            </div>
                            <div className="pt-1">
                                <h3 className="font-bold text-[#1c5563] text-sm mb-0.5">Phone</h3>
                                <p className="text-sm text-slate-500 mb-1">Mon-Fri from 8am to 6pm.</p>
                                <span className="text-[#2e6655] font-mono font-bold text-sm">+55 (85) 3366-8337</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LADO DIREITO: FORMULÁRIO COM MAILTO */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-transparent shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold text-[#1c5563] mb-8">Send us a Message</h2>
                
                {/* Aqui colocamos o onSubmit chamando a nossa função */}
                <form onSubmit={handleMailTo} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1c5563]/70 uppercase tracking-wider">Name</label>
                            {/* É preciso adicionar a tag 'name' aos inputs */}
                            <input required name="name" type="text" placeholder="Your name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6655]/50 focus:border-[#2e6655] transition-all text-[#1c5563] placeholder:text-slate-400" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1c5563]/70 uppercase tracking-wider">Email</label>
                            <input required name="email" type="email" placeholder="you@university.edu" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6655]/50 focus:border-[#2e6655] transition-all text-[#1c5563] placeholder:text-slate-400" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1c5563]/70 uppercase tracking-wider">Subject</label>
                        <select name="subject" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6655]/50 focus:border-[#2e6655] transition-all text-[#1c5563]">
                            <option>Academic Collaboration</option>
                            <option>Report Data Issue</option>
                            <option>General Inquiry</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1c5563]/70 uppercase tracking-wider">Message</label>
                        <textarea required name="message" rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e6655]/50 focus:border-[#2e6655] transition-all resize-none text-[#1c5563] placeholder:text-slate-400"></textarea>
                    </div>

                    {/* Botão mudou para type="submit" */}
                    <button type="submit" className="w-full bg-[#1c5563] hover:bg-[#2e6655] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-sm active:scale-[0.98]">
                        Open in your Email App
                        <Send size={18} />
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 mt-6 px-4">
                        Clicking the button will open your default email application with the message ready to send.
                    </p>
                </form>
            </div>

        </div>
      </main>
    </div>
  );
}