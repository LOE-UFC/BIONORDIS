import { auth } from "@/auth";
import Image from "next/image";
import { getMoleculaById } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  FlaskConical, 
  MapPin, 
  Sprout, 
  Target, 
  Edit, 
  Dna,
  BookOpen,
  ExternalLink,
  Tag,
  Weight,
  TestTube
} from "lucide-react";
import MoleculeViewer from "@/components/MoleculeViewer";
// 1. Importamos o OCL no lado do servidor para fazer os cálculos
import * as OCL from "openchemlib";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-700"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
);

export default async function MoleculaDetails(props: { 
  params: Promise<{ id: string }> 
}) {
  
  const params = await props.params;
  const id = params.id;
  
  const [molecula, session] = await Promise.all([
    getMoleculaById(id),
    auth()
  ]);

  if (!molecula) {
    notFound();
  }

  const tituloPagina = molecula.nome || molecula.nome_quimico || molecula.codigo || "Molécula Não Identificada";

  // 2. Lógica de cálculo químico Server-Side
  let formulaMolecular = "N/A";
  let pesoMolecular = "N/A";

  if (molecula.smiles) {
    try {
      const mol = OCL.Molecule.fromSmiles(molecula.smiles);
      const formulaProps = mol.getMolecularFormula();
      
      formulaMolecular = formulaProps.formula;
      pesoMolecular = formulaProps.absoluteWeight.toFixed(2) + " g/mol";
    } catch (error) {
      console.error("Erro ao calcular propriedades químicas para a molécula:", id);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">

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
      
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center text-slate-500 hover:text-emerald-600 gap-2 text-sm font-medium transition-colors">
                <ArrowLeft size={18} />
                Back to search
            </Link>
            
            {session?.user && (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 hidden sm:inline">Logged in as {session.user.name}</span>
                    <button className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all">
                        <Edit size={14} />
                        Edit Data
                    </button>
                </div>
            )}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        {molecula.classe || "Sustância Natural"}
                    </span>
                    {molecula.subclasse && (
                        <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                            {molecula.subclasse}
                        </span>
                    )}
                    {molecula.codigo && <span className="text-slate-400 text-xs font-mono">CODE: {molecula.codigo}</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                    {tituloPagina}
                </h1>
                <p className="text-lg text-slate-500 italic mt-1 font-serif">
                    {molecula.nome_cientifico || molecula.nome_iupac || ""}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[300px]">
                    
                    {molecula.smiles ? (
                        <div className="w-full mb-4">
                            <MoleculeViewer smiles={molecula.smiles} name={tituloPagina} />
                        </div>
                    ) : (
                        <div className="w-full h-48 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200 mb-4 group">
                            <div className="text-center">
                                <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                <span className="text-slate-400 text-xs">No 2D Structure Available</span>
                            </div>
                        </div>
                    )}
                    
                    {/* 3. Renderização dos dados calculados e do SMILES */}
                    <div className="w-full space-y-3">
                        
                        {molecula.smiles && (
                          <div className="grid grid-cols-2 gap-3">
                              <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center">
                                  <TestTube size={16} className="text-indigo-400 mb-1" />
                                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-0.5">Formula</p>
                                  <p className="text-sm font-bold text-slate-700">{formulaMolecular}</p>
                              </div>
                              <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100 flex flex-col items-center justify-center text-center">
                                  <Weight size={16} className="text-sky-400 mb-1" />
                                  <p className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-0.5">Mol. Weight</p>
                                  <p className="text-sm font-bold text-slate-700">{pesoMolecular}</p>
                              </div>
                          </div>
                        )}

                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1 mt-2">SMILES</p>
                            <div className="bg-slate-100 p-3 rounded-lg text-[11px] font-mono text-slate-600 break-all border border-slate-200">
                                {molecula.smiles || "Estrutura SMILES não registrada."}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Sprout size={18} className="text-emerald-600" />
                        Biological Origin
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-sm text-slate-500">Family</span>
                            <span className="text-sm font-medium text-slate-700 text-right">{molecula.familia || "Não informado"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-sm text-slate-500">Part Used</span>
                            <span className="text-sm font-medium text-slate-700 text-right">{molecula.parte_planta || "Não informado"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Biome/Region</span>
                            <span className="text-sm font-medium text-slate-700 text-right flex items-center gap-1">
                                <MapPin size={12} className="text-slate-400" /> 
                                {molecula.bioma || molecula.biodiversidade || "Nordeste, BR"}
                            </span>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen size={18} className="text-purple-600" />
                        Source & References
                    </h3>
                    
                    <div className="text-sm text-slate-600">
                        {molecula.autores && (
                            <p className="mb-2 text-xs font-medium text-slate-500 uppercase tracking-wide">Authors:</p>
                        )}
                        <p className="mb-4 leading-relaxed italic">
                            {molecula.autores || "Autores não especificados."}
                        </p>
                        
                        <div className="space-y-2">
                            {molecula.doi_link1 && (
                                <a 
                                    href={molecula.doi_link1.startsWith('http') ? molecula.doi_link1 : `https://doi.org/${molecula.doi_link1}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 py-2.5 rounded-lg font-bold transition-all text-xs uppercase tracking-wide group"
                                >
                                    Access Article 1 ({molecula.ano_pub1 || "Link"})
                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            )}

                            {molecula.doi_link2 && (
                                <a
                                    href={molecula.doi_link2.startsWith('http') ? molecula.doi_link2 : `https://doi.org/${molecula.doi_link2}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 py-2.5 rounded-lg font-bold transition-all text-xs uppercase tracking-wide group"
                                >
                                    Access Article 2 ({molecula.ano_pub2 || "Link"}) 
                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            )}

                            {!molecula.doi_link1 && !molecula.doi_link2 && (
                                <div className="bg-slate-50 text-slate-400 py-2 rounded-lg text-center text-xs italic border border-slate-100">
                                    No external links available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <Target size={20} />
                                <span className="text-sm font-bold uppercase tracking-wider">Biological Properties</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                                {molecula.propriedades_bio || "Propriedades em investigação"}
                            </h2>
                            <p className="text-slate-300 text-sm mt-3">
                                <span className="font-semibold text-emerald-300">Tipos de Ensaios:</span> {molecula.tipos_ensaios || "Não especificado."}
                            </p>
                        </div>
                        
                        {molecula.ic50 && (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[140px] text-center border border-white/10">
                                <p className="text-xs text-emerald-300 font-bold uppercase mb-1">IC50 Value</p>
                                <p className="text-2xl font-extrabold">{molecula.ic50}</p>
                                <span className="inline-block mt-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                    Reported
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Dna size={18} className="text-blue-600" />
                            Experimental Assays & Cell Lines
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cell Lines Used</h4>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-sm text-slate-700">
                                    {molecula.linhagens ? (
                                        <ul className="list-disc list-inside space-y-1">
                                            {molecula.linhagens.split(',').map((linhagem: string, idx: number) => (
                                                <li key={idx} className="marker:text-blue-400">{linhagem.trim()}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="italic text-slate-500">Nenhuma linhagem específica registrada no banco.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Experimental Results</h4>
                                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 text-sm text-slate-700 leading-relaxed">
                                    {molecula.atividades || "Resultados experimentais detalhados não informados."}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-2 text-slate-700 font-bold text-sm">
                            <Tag size={16} className="text-slate-400" />
                            Institution
                        </div>
                        <p className="text-sm text-slate-600">{molecula.instituicao || "Instituição não informada."}</p>
                    </div>
                    
                    {molecula.link_pubchem && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-center">
                            <a 
                                href={molecula.link_pubchem}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between group hover:text-emerald-600 transition-colors"
                            >
                                <span className="font-bold text-sm text-slate-700 group-hover:text-emerald-600">View on PubChem</span>
                                <ExternalLink size={18} className="text-slate-400 group-hover:text-emerald-500" />
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>
      </main>
    </div>
  );
}