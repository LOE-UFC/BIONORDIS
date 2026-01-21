import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <p className="text-slate-400 font-medium text-sm">Loading molecule data...</p>
      </div>
    </div>
  );
}