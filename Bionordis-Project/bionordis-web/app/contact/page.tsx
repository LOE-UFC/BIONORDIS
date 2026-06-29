"use client";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import '../home.css';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
  );

export default function ContactPage() {
  
  const handleMailTo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}
    `;

    const mailtoLink = `mailto:loe@ufc.br?subject=${encodeURIComponent(`[Bionordis Contact] ${subject}`)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="home-theme flex flex-col min-h-screen">
          <div className="bg-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="grid-overlay"></div>
      </div>
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
            <Link href="/about" >About</Link>
            <Link href="#">Research</Link>
            <Link href="#">Database</Link>
            <Link href="#">Team</Link>
            <Link href="/contact" className="font-bold text-[#4fd1c5]">Contact</Link>
          </nav>
          
        </div>
      </header>
      <main className="custom-container flex-1 py-16 animate-in slide-in-from-bottom-4 duration-700 relative z-10">
      <section className="mt-16 mb-16 space-y-6 text-center">
      <div className="badge inline-block mx-auto mb-6">
      GET IN TOUCH
            </div>
            <h1 className="main-display text-4xl md:text-5xl">
            Contact Us
            </h1>
            <p className="hero-text max-w-2xl mx-auto mt-6">
            Have questions about our data? Interested in academic collaboration? We are here to help.
            </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden space-y-6 h-full">
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

            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden space-y-6">
                <h2 className="text-xl font-bold text-[#1c5563] mb-8">Send us a Message</h2>
                
                <form onSubmit={handleMailTo} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1c5563]/70 uppercase tracking-wider">Name</label>
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
      <footer className="modern-footer mt-auto relative z-10">
        <div className="custom-container footer-content">
          <span className="copy">© 2026 Bionordis Platform</span>
          <div className="footer-line"></div>
        </div>
      </footer>
    </div>
  );
}