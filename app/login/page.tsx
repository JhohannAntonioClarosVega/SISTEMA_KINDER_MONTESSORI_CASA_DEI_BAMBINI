"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { useTheme } from 'next-themes';
import { Loader2, Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, Sun, Moon, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// ¡Nuestras partículas mágicas en pantalla completa!
import { ParticlesBackground } from '@/components/ParticlesBackground';

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado que controla en qué paso estamos (1 = Login, 2 = 2FA)
  const [step, setStep] = useState<1 | 2>(1);
  const [code2FA, setCode2FA] = useState("");

  // Evitar error de hidratación del tema
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      setLoading(false);
    } else {
      setStep(2);
      setLoading(false);
    }
  };

  const handleLoginStep2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulamos verificación del código 2FA
    if (code2FA.length === 6) {
      setTimeout(() => {
        router.push('/dashboard/estudiantes');
      }, 1000);
    } else {
      setError("El código debe tener 6 dígitos exactos.");
      setLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Aquí forzamos el color azul oscuro sólido unificado en modo dark
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500 font-sans overflow-hidden relative">
      
      {/* PARTÍCULAS MÁGICAS: Ocupando toda la pantalla y visibles en ambos lados */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>
      )}

      {/* BOTÓN DE TEMA FLOTANTE */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1E293B] text-[#FFD34E] shadow-lg border border-slate-200 dark:border-white/10 hover:scale-110 transition-transform" 
        >
          {mounted ? (theme === 'light' ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5" />) : <div className="w-5 h-5" />}
        </button>
      </div>

      {/* BOTÓN: VOLVER AL INICIO */}
      <div className="absolute top-6 left-6 lg:left-12 z-50">
        <Link href="/">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md text-slate-700 dark:text-slate-300 shadow-md border border-slate-200 dark:border-white/10 hover:scale-105 hover:text-[#4ECDC4] dark:hover:text-[#4ECDC4] transition-all font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Regresar al Portal
          </button>
        </Link>
      </div>

      {/* --- LADO IZQUIERDO: TEXTO Y BRANDING (SIN FOTO) --- */}
      <div className="hidden lg:flex relative w-1/2 overflow-hidden items-center justify-center group z-10 border-r border-slate-200 dark:border-white/5">
        
        {/* Eliminamos la imagen de fondo. Ahora es puramente color, luces suaves y el fondo unificado */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4ECDC4]/10 rounded-full blur-[100px] animate-pulse-soft pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-[100px] animate-pulse-soft pointer-events-none" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 p-20 text-slate-800 dark:text-white w-full max-w-2xl flex flex-col justify-between h-full py-24">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="bg-white dark:bg-white/10 p-2 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                 <img src="/logo_m.png" alt="Logo CDB" className="w-10 h-10 object-contain" />
              </div>
              <span className="font-display font-bold text-2xl tracking-wide">Casa dei Bambini</span>
            </div>
            
            <h1 className="text-5xl xl:text-6xl font-display font-bold mb-6 leading-tight text-slate-900 dark:text-white">
              Gestión escolar <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#2563EB]">inteligente y segura.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
              El panel de administración diseñado exclusivamente para potenciar el talento de nuestro ecosistema educativo.
            </p>
          </div>

          {/* Tarjeta de testimonio estilo Glassmorphism */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl relative">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-[#4ECDC4]/10" />
            <p className="text-slate-700 dark:text-white/90 italic font-medium leading-relaxed mb-6">
              "La mayor señal de éxito de un profesor es poder decir: Ahora los niños trabajan como si yo no existiera."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFD34E]/20 rounded-full flex items-center justify-center text-yellow-600 dark:text-[#FFD34E] font-bold font-display text-xl">M</div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white font-display tracking-wide">Maria Montessori</p>
                <p className="text-[10px] text-[#4ECDC4] font-bold uppercase tracking-widest">Filosofía Institucional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LADO DERECHO: FORMULARIOS --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative z-10 transition-colors duration-500">
        
        {/* En el lado derecho usamos bg-transparent para que tome el color global del contenedor y se vean las partículas */}
        
        <div className="w-full max-w-[420px] relative z-10">
          
          {/* =========================================
              PASO 1: INICIAR SESIÓN (EMAIL Y CONTRASEÑA)
              ========================================= */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              
              <div className="mb-10 text-center lg:text-left mt-10 lg:mt-0">
                <div className="flex justify-center lg:justify-start mb-8">
                   {/* Logo en móvil */}
                  <div className="w-20 h-20 bg-white dark:bg-[#1E293B] rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 dark:border-white/5 lg:hidden">
                    <img src="/logo_m.png" alt="Logo CDB" className="w-12 h-12 object-contain" />
                  </div>
                </div>
                <h2 className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-3">Iniciar Sesión</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Ingresa tus credenciales para acceder al portal administrativo.</p>
              </div>

              <form onSubmit={handleLoginStep1} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-[#FF6B6B]/10 border border-red-200 dark:border-[#FF6B6B]/20 text-red-600 dark:text-[#FF6B6B] rounded-2xl text-sm font-bold text-center animate-in shake">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-bold ml-2">Correo Electrónico</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#4ECDC4] transition-colors" />
                    </div>
                    <Input 
                      name="email" type="email" required placeholder="directora@casadeibambini.com" 
                      className="pl-14 h-16 rounded-3xl bg-white dark:bg-[#1E293B]/50 border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#4ECDC4]/50 focus-visible:border-[#4ECDC4] font-medium transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Contraseña</Label>
                    <a href="#" className="text-xs font-bold text-[#4ECDC4] hover:text-[#3dbdb4] transition-colors">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#4ECDC4] transition-colors" />
                    </div>
                    <Input 
                      name="password" type="password" required placeholder="••••••••" 
                      className="pl-14 h-16 rounded-3xl bg-white dark:bg-[#1E293B]/50 border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#4ECDC4]/50 focus-visible:border-[#4ECDC4] font-medium tracking-widest transition-all shadow-sm"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-16 text-lg font-bold bg-gradient-to-r from-[#4ECDC4] to-[#2563EB] hover:from-[#3dbdb4] hover:to-[#1d4ed8] text-white rounded-3xl shadow-xl shadow-[#4ECDC4]/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-8">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Ingresar al Portal
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* =========================================
              PASO 2: VERIFICACIÓN 2FA (6 DÍGITOS)
              ========================================= */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
              <div className="mb-10 text-center flex flex-col items-center mt-10 lg:mt-0">
                <div className="w-20 h-20 bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-[#4ECDC4]/20">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-3">Verificación de 2 Pasos</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-center px-4">
                  Hemos enviado un código de seguridad a tu dispositivo. Ingrésalo para verificar tu identidad.
                </p>
              </div>

              <form onSubmit={handleLoginStep2} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-[#FF6B6B]/10 border border-red-200 dark:border-[#FF6B6B]/20 text-red-600 dark:text-[#FF6B6B] rounded-2xl text-sm font-bold text-center animate-in shake">
                    {error}
                  </div>
                )}

                <div className="flex flex-col items-center justify-center">
                  <Input 
                    name="code" 
                    type="text" 
                    maxLength={6}
                    value={code2FA}
                    onChange={(e) => setCode2FA(e.target.value.replace(/\D/g, ''))}
                    required 
                    placeholder="000000" 
                    className="h-24 w-full sm:w-4/5 rounded-[2rem] bg-white dark:bg-[#1E293B]/50 border-slate-200 dark:border-white/5 text-slate-800 dark:text-[#4ECDC4] focus-visible:ring-2 focus-visible:ring-[#4ECDC4]/50 focus-visible:border-transparent text-center text-5xl font-display font-bold tracking-[0.5em] shadow-inner transition-all"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep(1)} disabled={loading} variant="outline" className="w-1/3 h-16 font-bold rounded-3xl border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300">
                    Volver
                  </Button>
                  <Button type="submit" disabled={loading || code2FA.length !== 6} className="w-2/3 h-16 font-bold bg-gradient-to-r from-[#4ECDC4] to-[#2563EB] hover:from-[#3dbdb4] hover:to-[#1d4ed8] text-white rounded-3xl shadow-lg shadow-[#4ECDC4]/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 text-lg">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verificar Código"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* FOOTER DEL FORMULARIO */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/10">
            <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              © 2026 Casa Dei Bambini
              <span className="block mt-2 font-medium normal-case tracking-normal opacity-70">Infraestructura Escolar Segura</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}