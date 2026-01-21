'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom'; 
import { authenticate } from '@/app/lib/actions'; 
import { AlertCircle } from 'lucide-react'; 

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="relative w-48 h-12 cursor-pointer">
              <Image 
                src="/BIONORDIS-LOGO/2.png" 
                alt="Bionordis Logo" 
                width={1280}
                height={376}
                className="object-contain object-left h-full w-auto"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
               <Link href="#" className="hover:text-emerald-600">About</Link>
               <Link href="#" className="hover:text-emerald-600">Team</Link>
               <Link href="#" className="hover:text-emerald-600">Contact</Link>
               <Link href="#" className="hover:text-emerald-600">How to Cite</Link>
            </nav>
            <button className="p-2 rounded-full bg-slate-800 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#F1F5F9] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 md:p-12 w-full max-w-[500px]">
            <h1 className="text-2xl font-bold text-slate-700 text-center mb-10 tracking-wide">
                LOGIN
            </h1>

            <form action={dispatch} className="flex flex-col gap-6">
                <div>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="User (Email):" 
                        required
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400"
                    />
                </div>

                <div>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password:" 
                        required
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400"
                    />
                </div>

                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                  {errorMessage && (
                    <>
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                  )}
                </div>

                <LoginButton />
            </form>
        </div>
      </main>
      <footer className="py-8 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="h-12 w-auto flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400">[Logo UFC]</span>
                </div>
                <div className="h-12 w-auto flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400">[Logo LabLOE]</span>
                </div>
                <div className="h-12 w-auto flex items-center justify-center">
                     <span className="text-xs font-bold text-slate-400">[Logo CNPq]</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 font-medium text-center">
                Laboratory of Experimental Oncology - Universidade Federal do Ceará
            </p>
        </div>
      </footer>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center mt-4">
      <button 
          type="submit"
          disabled={pending}
          className="bg-[#CFFFE5] hover:bg-[#bbf7d0] text-emerald-900 font-bold py-3 px-12 rounded-full shadow-sm transition-colors duration-200 tracking-wide flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
          {pending ? "LOADING..." : "ACCESS"}
      </button>
    </div>
  );
}