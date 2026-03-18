"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Users, MessageSquare, Lightbulb, LogOut, HelpCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Estados para controlar el modal de Cerrar Sesión
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { name: 'Directorio Pioneros', href: '/dashboard/estudiantes', icon: Users },
    { name: 'Mensajes', href: '/dashboard/mensajes', icon: MessageSquare },
  ];

  return (
    <>
      <aside className="w-80 glass-panel border-r border-white/5 flex-col hidden lg:flex h-full z-20 bg-white/5 dark:bg-transparent">
        <div className="p-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#FFD34E] via-[#4ECDC4] to-[#FF6B6B] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              {/* LOGO ACTUALIZADO */}
              <div className="w-24 h-24 bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center relative z-10 drop-shadow-2xl">
                 <img src="/logo_m.png" alt="Logo CDB" className="w-16 h-16 object-contain transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="text-center mt-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Casa dei Bambini</h2>
              <p className="text-[10px] uppercase tracking-widest text-[#4ECDC4] font-bold mt-1">Educational Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-2 px-6 space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icono = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group ${
                  isActive ? 'sidebar-active bg-[#4ECDC4]/10 dark:bg-transparent' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Icono className={`w-5 h-5 transition-transform ${!isActive && 'group-hover:scale-110'}`} />
                <span className="font-medium font-sans">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* TIP DEL DÍA Y SALIR */}
        <div className="p-8 space-y-4">
          <div className="glass-card p-5 rounded-3xl bg-[#4ECDC4]/5 border-[#4ECDC4]/10 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#4ECDC4]/10 rounded-full blur-xl animate-pulse-soft"></div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-[#4ECDC4]" />
              <p className="text-[10px] text-[#4ECDC4] uppercase font-bold tracking-wider">Tip del Día</p>
            </div>
            <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-300 font-sans">"Sigue al niño. No lo guíes, ayúdalo a hacerlo por sí mismo."</p>
            <p className="text-[9px] mt-2 text-slate-400 dark:text-slate-500 font-medium">— Maria Montessori</p>
          </div>

          {/* BOTÓN QUE AHORA ABRE EL MODAL EN LUGAR DE CERRAR DIRECTO */}
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 px-5 py-3.5 w-full rounded-2xl transition-all text-slate-500 dark:text-slate-400 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium font-sans">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- MODAL CONFIRMACIÓN DE CERRAR SESIÓN --- */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans">
          <DialogHeader>
            <div className="w-16 h-16 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8" />
            </div>
            <DialogTitle className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center">¿Cerrar Sesión?</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-center mt-2">
              Estás a punto de salir de tu cuenta. Tendrás que ingresar tus credenciales la próxima vez.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 pt-6 border-t border-slate-200 dark:border-white/5 mt-4">
            <button 
              type="button" 
              onClick={() => setShowLogoutModal(false)} 
              className="h-11 px-6 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all font-bold"
            >
              Cancelar
            </button>
            <button 
              type="button" 
              onClick={confirmLogout} 
              disabled={isLoggingOut} 
              className="h-11 px-6 bg-[#FF6B6B] hover:bg-[#E55A5A] text-white font-bold rounded-xl shadow-lg transition-all flex items-center"
            >
              {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LogOut className="w-4 h-4 mr-2" />} Sí, salir
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}