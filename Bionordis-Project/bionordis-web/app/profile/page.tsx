import { auth, signOut } from "@/auth"; 
import Image from "next/image";
import Link from "next/link";
import { User, Building2, Briefcase, LogOut } from "lucide-react"; 

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) return <div className="p-10 text-center">Acess denied.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link href="/">
             <Image src="/BIONORDIS-LOGO/2.png" alt="Logo" width={160} height={50} className="h-10 w-auto cursor-pointer" />
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-600">Back to Home Page</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="h-20 w-20 rounded-full bg-white p-1 shadow-md">
                    <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600">
                        {user.name?.charAt(0) || "U"}
                    </div>
                </div>
             </div>
          </div>

          <div className="pt-14 pb-8 px-8 text-center">
            
            <h1 className="text-xl font-bold text-slate-800">{user.name}</h1>
            <p className="text-sm text-slate-400 mb-6">{user.email}</p>

            <div className="space-y-4 text-left">
                <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4 border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Institution</p>
                        <p className="text-sm font-semibold text-slate-700">
                            {user.institution || "Não informado"}
                        </p>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4 border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Function / Position</p>
                        <p className="text-sm font-semibold text-slate-700">
                            {user.role || "Pesquisador"}
                        </p>
                    </div>
                </div>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="mt-8"
            >
              <button className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </form>

          </div>
        </div>
      </main>

    </div>
  );
}