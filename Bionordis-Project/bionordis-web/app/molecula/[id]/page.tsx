import { auth } from "@/auth";
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
  ShieldCheck,
  Dna,
  BookOpen,
  ExternalLink
} from "lucide-react";

export default async function MoleculaDetails(props: { 
  params: Promise<{ id: string }> 
}) {
  
  const params = await props.params;
  const id = params.id;
  
  console.log("✅ ID RECEIVED ON PAGE:", id);

  const [molecula, session] = await Promise.all([
    getMoleculaById(id),
    auth()
  ]);

  if (!molecula) {
    console.log("❌ Molecule returned NULL from DB. Redirecting to 404.");
    notFound();
  }

  const atividadeBiologica = {
    melhorIndicacao: "Breast Cancer (MDA-MB-435)",
    ic50: "0.27 µg/mL",
    potencia: "High",
    outrosTestes: [
      { linhagem: "Prostate (PC-3)", valor: "0.32 µg/mL", nivel: "High" },
      { linhagem: "Leukemia (HL-60)", valor: "1.27 µg/mL", nivel: "Moderate" },
      { linhagem: "Colon (HCT-8)", valor: "1.59 µg/mL", nivel: "Moderate" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
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
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        {molecula.classe || "Natural Substance"}
                    </span>
                    {molecula.id && <span className="text-slate-400 text-xs font-mono">ID: {molecula.id}</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                    {molecula.nome}
                </h1>
                <p className="text-lg text-slate-500 italic mt-1 font-serif">
                    {molecula.nome_cientifico || "Unidentified species"}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-full h-48 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200 mb-4 group cursor-pointer hover:border-emerald-300 transition-colors">
                        <div className="text-center">
                            <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-2 group-hover:text-emerald-400 transition-colors" />
                            <span className="text-slate-400 text-xs">2D Visualization</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">SMILES</p>
                        <div className="bg-slate-100 p-3 rounded-lg text-xs font-mono text-slate-600 break-all border border-slate-200">
                            {molecula.smiles || "N/A"}
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
                            <span className="text-sm font-medium text-slate-700 text-right">{molecula.familia || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-sm text-slate-500">Biome</span>
                            <span className="text-sm font-medium text-slate-700 text-right">{molecula.bioma || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Location</span>
                            <span className="text-sm font-medium text-slate-700 text-right flex items-center gap-1">
                                <MapPin size={12} /> Northeast, BR
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen size={18} className="text-purple-600" />
                        Reference & Source
                    </h3>
                    
                    <div className="text-sm text-slate-600">
                        <p className="mb-3 leading-relaxed">
                            {molecula.referencia || "Data extracted from indexed scientific article."}
                        </p>
                        
                        {molecula.doi_link1 ? (
                            <a 
                                href={molecula.doi_link1} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 py-2.5 rounded-lg font-bold transition-all text-xs uppercase tracking-wide group"
                            >
                                Access Article 1
                                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        ) : (
                            <div className="bg-slate-50 text-slate-400 py-2 rounded-lg text-center text-xs italic border border-slate-100">
                                Link not available
                            </div>
                        )}

                        {molecula.doi_link2 ? (
                            <a
                                href={molecula.doi_link2} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 py-2.5 rounded-lg font-bold transition-all text-xs uppercase tracking-wide group"
                            >
                                Access Article 2  
                                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        ) : (
                            <div className="bg-slate-50 text-slate-400 py-2 rounded-lg text-center text-xs italic border border-slate-100">
                                Link not available
                            </div>
                        )}
                    </div>
                    

                    {molecula.doi && (
                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-500">DOI:</span>
                            <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded select-all">
                                {molecula.doi}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <Target size={20} />
                                <span className="text-sm font-bold uppercase tracking-wider">Potential Therapeutic Target</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{atividadeBiologica.melhorIndicacao}</h2>
                            <p className="text-slate-300 text-sm max-w-lg">
                                This molecule showed superior cytotoxic selectivity for breast cancer tumor lines.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[140px] text-center border border-white/10">
                            <p className="text-xs text-emerald-300 font-bold uppercase mb-1">IC50 Value</p>
                            <p className="text-3xl font-extrabold">{atividadeBiologica.ic50}</p>
                            <span className="inline-block mt-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">HIGH POTENCY</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Dna size={18} className="text-blue-600" />
                            Cytotoxic Assays (MTT)
                        </h3>
                        <span className="text-xs text-slate-400">Ref: Table 1</span>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Cell Line</th>
                                        <th className="px-4 py-3">IC50 (µg/mL)</th>
                                        <th className="px-4 py-3 rounded-r-lg">Classification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="bg-emerald-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-800 flex items-center gap-2">
                                            {atividadeBiologica.melhorIndicacao}
                                            <ShieldCheck size={14} className="text-emerald-600" />
                                        </td>
                                        <td className="px-4 py-3 font-bold text-emerald-700">{atividadeBiologica.ic50}</td>
                                        <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">High</span></td>
                                    </tr>
                                    {atividadeBiologica.outrosTestes.map((teste, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-slate-600">{teste.linhagem}</td>
                                            <td className="px-4 py-3 text-slate-600">{teste.valor}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${teste.nivel === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{teste.nivel}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}