import Link from "next/link";
import Image from "next/image"; 
import { Github, Mail, MapPin } from "lucide-react";

export function Footer() { 
  const partners = [
    { name: "UFC", file: "Logo-UFC.png", url: "https://www.ufc.br", label: "Univ. Federal do Ceará" },
    { name: "INCT Bio", file: "Logo-INCT.png", url: "https://www.inctbio2.com.br/", label: "INCT Bio2" },
    { name: "CNPq", file: "Logo-CNPQ.png", url: "https://www.gov.br/cnpq", label: "Apoio Financeiro" },
    { name: "NPDM", file: "Logo-LOE.jpeg", url: "https://npdm.ufc.br", label: "NPDM / LOE" },
    { name: "Fiocruz", file: "Logo-Fiocruz.png", url: "https://www.fiocruz.br", label: "Bio-Manguinhos" },
  ];

  return (
    // Trocado bg-slate-900 pelo Azul Escuro do projeto
    <footer className="bg-[#014462] text-slate-300 border-t border-[#01354d]">
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2 space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              A digital repository bridging the gap between biodiversity and drug discovery. 
              Developed at the Experimental Oncology Laboratory (LOE/UFC).
            </p>
            <div className="flex items-center gap-4 pt-2">
                <a href="mailto:contact@bionordis.ufc.br" className="bg-white/10 p-2 rounded-full hover:bg-[#389F60] hover:text-white transition-colors">
                    <Mail size={18} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white hover:text-[#014462] transition-colors">
                    <Github size={18} />
                </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-[#389F60] transition-colors">Search Molecules</Link></li>
              <li><Link href="/about" className="hover:text-[#389F60] transition-colors">About Project</Link></li>
              <li><Link href="/contact" className="hover:text-[#389F60] transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#389F60] transition-colors">How to Cite</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Location</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                {/* Trocado emerald-500 pelo Verde INCT */}
                <MapPin size={16} className="mt-1 text-[#389F60] shrink-0" />
                <span>
                  Rua Coronel Nunes de Melo, 1000 - Rodolfo Teófilo<br/>
                  Fortaleza - CE, Brazil
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 pb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
                Institutional Partners & Support
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {partners.map((partner) => (
                    <a 
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-1"
                    >
                        <div className="h-16 w-32 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(56,159,96,0.4)] transition-all duration-300">
                           <Image 
                             src={`/logos/${partner.file}`} 
                             alt={partner.name}
                             width={100}
                             height={50}
                             className="object-contain max-h-full w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                           />
                        </div>
                        
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-[#389F60] transition-colors">
                            {partner.label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}