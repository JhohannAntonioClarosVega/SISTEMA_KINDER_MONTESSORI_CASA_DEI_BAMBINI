"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Moon, Sun } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function TopBarActions() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Herramientas de Next.js para la búsqueda
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Función que atrapa lo que escribes y lo manda a la URL
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-white dark:bg-white/5 rounded-full p-1.5 border border-slate-200 dark:border-white/10 shadow-sm">
        
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-[#FFD34E] shadow-sm hover:scale-110 transition-transform" 
          title={mounted ? (theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro') : ''}
        >
          {mounted ? (theme === 'light' ? <Sun className="w-4 h-4 text-brand-orange" /> : <Moon className="w-4 h-4" />) : <div className="w-4 h-4" />}
        </button>
      </div>

      <div className="relative hidden sm:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        <input 
          // Conectamos el input con nuestra función handleSearch
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('q')?.toString()}
          className="bg-white dark:bg-[#1E293B]/50 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-6 py-2.5 w-72 focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm text-slate-800 dark:text-white shadow-sm dark:shadow-inner" 
          placeholder="Buscar pequeño explorador..." 
          type="text"
        />
      </div>
    </div>
  );
}