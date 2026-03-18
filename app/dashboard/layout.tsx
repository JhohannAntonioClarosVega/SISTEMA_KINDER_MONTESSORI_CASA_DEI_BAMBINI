import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   // Cambiamos bg-[#0F172A] por bg-slate-50 dark:bg-[#0F172A]
    <div className="flex h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 font-sans overflow-hidden grainy selection:bg-[#4ECDC4] selection:text-white relative transition-colors duration-500">
      
      {/* ELEMENTOS DECORATIVOS FLOTANTES */}
      <div className="education-icon top-10 right-10 animate-float-slow text-[#FFD34E]">casa dei bambini</div>
      <div className="education-icon bottom-20 left-40 animate-float-medium text-[#4ECDC4]" style={{animationDelay: '-3s'}}>casa dei bambini</div>
      <div className="education-icon top-1/2 right-1/4 animate-float-slow text-[#FF6B6B]" style={{animationDelay: '-5s'}}>casa dei bambini</div>
      <div className="education-icon bottom-10 right-10 animate-float-medium text-[#8DE969]">casa dei bambini</div>

      <div className="flex w-full h-full relative z-10">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}