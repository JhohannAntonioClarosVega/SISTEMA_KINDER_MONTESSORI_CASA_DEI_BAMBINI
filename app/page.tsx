"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sparkles, Ticket, Smile, ArrowRight, Instagram, Facebook, Youtube, MapPin, Phone, Moon, Sun, Baby, Palette, Rocket, GraduationCap, Music, Globe, Infinity as InfinityIcon } from 'lucide-react';
import { FormularioContacto } from '@/components/FormularioContacto';
import { ParticlesBackground } from '@/components/ParticlesBackground';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('bg-white/90', 'dark:bg-[#0F172A]/80', 'backdrop-blur-xl', 'shadow-lg', 'dark:border-b', 'dark:border-white/10');
          nav.classList.remove('py-4');
          nav.classList.add('py-2');
        } else {
          nav.classList.remove('bg-white/90', 'dark:bg-[#0F172A]/80', 'backdrop-blur-xl', 'shadow-lg', 'dark:border-b', 'dark:border-white/10', 'py-2');
          nav.classList.add('py-4');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    // AQUÍ ESTÁ EL FONDO CREMA GLOBAL: bg-[#FDF8F0]
    <div className="font-sans text-slate-800 dark:text-slate-200 bg-[#FDF8F0] dark:bg-[#0F172A] overflow-x-hidden selection:bg-[#4ECDC4] selection:text-white transition-colors duration-500 grainy relative">
      
      {mounted && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>
      )}

      <nav className="fixed w-full z-50 transition-all duration-500 py-4" id="main-nav">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_m.png" alt="Logo CDB" className="w-12 h-12 object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none text-slate-800 dark:text-white">Casa dei Bambini</span>
              <span className="text-[9px] uppercase tracking-widest text-[#4ECDC4] font-bold">Portal Educativo</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-bold text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
            <a className="hover:text-[#4ECDC4] transition-colors text-xs uppercase tracking-widest" href="#">Inicio</a>
            <a className="hover:text-[#FFD34E] transition-colors text-xs uppercase tracking-widest" href="#servicios">Servicios</a>
            <a className="hover:text-[#FF6B6B] transition-colors text-xs uppercase tracking-widest" href="#nosotros">Sobre nosotros</a>
            <a className="hover:text-[#8DE969] transition-colors text-xs uppercase tracking-widest" href="#contacto-form">Contacto</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-[#FFD34E] shadow-sm border border-slate-200 dark:border-transparent hover:scale-110 transition-transform">
              {mounted ? (theme === 'light' ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5" />) : <div className="w-5 h-5" />}
            </button>
            <a className="hidden sm:flex text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-sm font-bold tracking-wider uppercase transition-colors mr-2" href="/login">Ingresar</a>
            <a className="bg-gradient-to-r from-[#4ECDC4] to-[#2563EB] text-white px-8 py-3 rounded-[2rem] font-bold text-sm shadow-[0_4px_20px_rgba(78,205,196,0.3)] hover:-translate-y-1 transition-all" href="#contacto-form">Agendar Tour</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#4ECDC4]/20 rounded-full blur-[120px] animate-pulse-soft -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFD34E]/20 rounded-full blur-[120px] animate-float-slow -z-10"></div>
        
        <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-full text-xs font-black mb-8 tracking-[0.2em] uppercase border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse"></span>Educación Viva
            </div>
            <h1 className="text-6xl lg:text-[6.5rem] leading-[0.9] mb-8 font-display font-bold text-slate-800 dark:text-white">
              Crecer es un <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-blue-500 italic">Arte.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
              Transformamos la educación en una experiencia digital y sensorial sin precedentes para las mentes más brillantes de Cochabamba.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="group bg-[#FFD34E] text-[#0F172A] px-10 py-5 rounded-2xl font-black text-lg hover:shadow-lg hover:-translate-y-2 flex items-center gap-3 transition-all">
                Empezar Viaje <Sparkles className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative z-20">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 aspect-square lg:aspect-[4/3]">
                <img alt="Niño aprendiendo" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3s]" src="/imagen3.jpg" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/20 dark:bg-[#0F172A]/40 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">GESTIÓN 2026</p>
                      <p className="text-white text-2xl font-display font-bold">Inscripciones Abiertas</p>
                    </div>
                    <div className="w-14 h-14 bg-[#8DE969] rounded-full flex items-center justify-center text-[#0F172A] shadow-lg"><Ticket className="w-6 h-6" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FF6B6B] rounded-[2rem] flex items-center justify-center shadow-xl animate-float-medium z-30 rotate-12"><Smile className="w-16 h-16 text-white" /></div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden" id="servicios">
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl mb-16 reveal">
            <h2 className="text-5xl lg:text-7xl font-display font-bold text-slate-800 dark:text-white mb-6">Nuestros <span className="text-[#FFD34E] italic">Niveles.</span></h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Acompañamos cada etapa del desarrollo de tu pequeño con programas especializados y amor.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Tarjetas blancas para contrastar con el fondo crema */}
            <div className="relative group reveal">
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] h-full border border-slate-200 dark:border-white/10 hover:border-[#FFD34E]/50 transition-all duration-500 hover:-translate-y-2 relative z-10 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#FFD34E]/20 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform"><Baby className="w-8 h-8 text-yellow-600 dark:text-[#FFD34E]" /></div>
                <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Preparatorio</h3>
              </div>
            </div>
            <div className="relative group reveal" style={{ transitionDelay: '100ms' }}>
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] h-full border border-slate-200 dark:border-white/10 hover:border-[#4ECDC4]/50 transition-all duration-500 hover:-translate-y-2 relative z-10 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform"><Palette className="w-8 h-8 text-teal-600 dark:text-[#4ECDC4]" /></div>
                <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Inicial</h3>
              </div>
            </div>
            <div className="relative group reveal" style={{ transitionDelay: '200ms' }}>
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] h-full border border-slate-200 dark:border-white/10 hover:border-[#FF6B6B]/50 transition-all duration-500 hover:-translate-y-2 relative z-10 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform"><Rocket className="w-8 h-8 text-red-500 dark:text-[#FF6B6B]" /></div>
                <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Pre Kinder</h3>
              </div>
            </div>
            <div className="relative group reveal" style={{ transitionDelay: '300ms' }}>
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] h-full border border-slate-200 dark:border-white/10 hover:border-[#8DE969]/50 transition-all duration-500 hover:-translate-y-2 relative z-10 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#8DE969]/20 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform"><GraduationCap className="w-8 h-8 text-green-600 dark:text-[#8DE969]" /></div>
                <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Kinder</h3>
              </div>
            </div>
          </div>

          <div className="relative group reveal">
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F766E] p-10 lg:p-12 rounded-[3rem] border border-white/10 relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transform hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute -left-10 -top-20 w-64 h-64 border-[30px] border-white/5 rounded-full pointer-events-none"></div>
              <div className="absolute -right-10 -bottom-20 w-80 h-80 border-[2px] border-dashed border-white/20 rounded-full pointer-events-none animate-spin-slow"></div>
              <div className="flex items-center gap-6 sm:gap-8 relative z-20 text-center md:text-left">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center backdrop-blur-md shrink-0"><Sparkles className="w-10 h-10 text-[#FFD34E]" /></div>
                <div><p className="text-[#4ECDC4] font-bold text-xs sm:text-sm tracking-widest uppercase mb-1">Actividades Adicionales</p><h3 className="text-4xl md:text-5xl font-display font-bold text-white">Extracurriculares</h3></div>
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-4 relative z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg hover:bg-white/20 transition-colors cursor-default"><Globe className="w-6 h-6 text-[#FFD34E]" /><span className="text-xl font-display font-bold text-white">Inglés</span></div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg hover:bg-white/20 transition-colors cursor-default"><Music className="w-6 h-6 text-[#FF6B6B]" /><span className="text-xl font-display font-bold text-white">Danza</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-white dark:bg-[#1E293B]/20 transition-colors duration-500 shadow-sm" id="nosotros">
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8DE969]/10 rounded-full blur-[100px] animate-pulse-soft -z-10"></div>
        <div className="max-w-[1000px] mx-auto px-8 relative z-10 text-center reveal">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#8DE969]/10 text-[#5cb938] dark:text-[#8DE969] rounded-full text-xs font-black mb-8 tracking-[0.2em] uppercase border border-[#8DE969]/20 shadow-sm">
            <span className="w-2 h-2 bg-[#8DE969] rounded-full animate-pulse"></span> Nuestra Filosofía
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-bold text-slate-800 dark:text-white mb-12 leading-tight">Forjando líderes con <br/><span className="text-[#8DE969] italic">Corazón y Razón.</span></h2>
          <div className="space-y-8 text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl mx-auto sm:text-center text-justify">
            <p>En la <strong className="text-slate-800 dark:text-white font-bold">Casa Dei Bambini</strong>, no solo preparamos a los niños para la escuela primaria; los preparamos para la vida. Basados en la metodología Montessori, creemos en el inmenso potencial de cada pequeño explorador.</p>
            <p>Nuestro objetivo es cultivar la independencia, el pensamiento crítico y la empatía en un ambiente seguro y estimulante, guiados por educadores apasionados.</p>
          </div>
          <div className="mt-16 grid sm:grid-cols-3 gap-6 border-t border-slate-200 dark:border-white/10 pt-16">
            <div className="bg-[#FDF8F0] dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform text-left"><h4 className="font-display font-bold text-2xl text-[#FFD34E] mb-4">Autonomía</h4><p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Fomentamos la independencia y la toma de decisiones seguras desde el primer día.</p></div>
            <div className="bg-[#FDF8F0] dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform text-left"><h4 className="font-display font-bold text-2xl text-[#4ECDC4] mb-4">Respeto</h4><p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Creamos un ecosistema basado en el respeto mutuo y el ritmo de cada niño.</p></div>
            <div className="bg-[#FDF8F0] dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-sm hover:-translate-y-2 transition-transform text-left"><h4 className="font-display font-bold text-2xl text-[#FF6B6B] mb-4">15+ Años</h4><p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">De experiencia comprobada guiando a las futuras generaciones hacia el éxito.</p></div>
          </div>
        </div>
      </section>

      <section className="py-32 relative" id="galeria">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative z-10">
              <h2 className="text-5xl lg:text-6xl font-display font-bold text-slate-800 dark:text-white mb-10 leading-tight">Espacios que <br/><span className="text-[#8DE969]">Inspiran.</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="text-5xl font-display font-black text-slate-200 dark:text-white/5 group-hover:text-[#4ECDC4] transition-colors">01</div>
                  <div><h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Diseño Biofílico</h4><p className="text-md text-slate-500 dark:text-slate-400">Integración de la naturaleza en cada rincón para reducir el estrés.</p></div>
                </div>
                <div className="flex gap-6 group">
                  <div className="text-5xl font-display font-black text-slate-200 dark:text-white/5 group-hover:text-[#FFD34E] transition-colors">02</div>
                  <div><h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Luz Dinámica</h4><p className="text-md text-slate-500 dark:text-slate-400">Salones iluminados que mantienen la armonía emocional de los pioneros.</p></div>
                </div>
              </div>
            </div>
            
            <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: '200ms' }}>
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-lg border border-white/10"><img alt="Kinder 1" className="w-full h-full object-cover" src="/imagen5.jpg" /></div>
                <div className="aspect-square bg-gradient-to-br from-[#FFD34E] to-orange-400 rounded-[2.5rem] p-8 flex flex-col justify-between text-[#0F172A] shadow-lg"><InfinityIcon className="w-10 h-10" /><p className="text-2xl font-display font-bold">Creatividad infinita</p></div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-[#8DE969] rounded-[2.5rem] flex items-center justify-center text-white shadow-lg overflow-hidden border border-white/10"><img alt="Kinder 2" className="w-full h-full object-cover opacity-90 mix-blend-multiply" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" /></div>
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-lg border border-white/10"><img alt="Kinder 3" className="w-full h-full object-cover" src="/imagen2.jpg" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0F172A] transition-colors shadow-inner" id="contacto-form">
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-800 dark:text-white mb-4">¿Dudas? <span className="text-[#FFD34E]">Escríbenos o Visítanos.</span></h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Déjanos tus datos o ven a conocer nuestras instalaciones en Cochabamba.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch reveal">
            {/* Fomulario blanco sobre blanco para look ultra limpio */}
            <div className="bg-[#FDF8F0] dark:bg-[#1E293B] p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-200 dark:border-white/5 h-full">
              <FormularioContacto />
            </div>
            <div className="bg-[#FDF8F0] dark:bg-[#1E293B] p-4 rounded-[3rem] shadow-sm border border-slate-200 dark:border-white/5 h-full min-h-[450px] relative overflow-hidden group">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <iframe src="https://maps.google.com/maps?q=Unidad+Educativa+Montessori+Casa+dei+Bambini+Cochabamba&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="filter dark:brightness-90 dark:contrast-125 transition-all duration-500"></iframe>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFD34E]/20 rounded-full flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-yellow-600 dark:text-[#FFD34E]" /></div>
                  <div><h4 className="font-display font-bold text-lg text-slate-800 dark:text-white">Nuestra Ubicación</h4><p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Avenida Villazon Km 5, Calle La Rinconada</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 dark:bg-[#0B1120] text-white pt-24 pb-12 relative overflow-hidden font-sans z-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6"><img src="/logo_m.png" alt="Logo CDB" className="w-10 h-10 object-contain grayscale brightness-200 opacity-80" /><span className="text-2xl font-display font-bold">Casa dei Bambini</span></div>
              <p className="text-lg text-white/50 leading-relaxed mb-8 pr-10">Redefiniendo los límites de la educación inicial en Cochabamba. Un espacio donde la curiosidad es el motor del cambio.</p>
              <div className="flex gap-4"><a className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#4ECDC4] transition-all" href="https://www.facebook.com/profile.php?id=100063578634232" target='_blank'><Facebook className="w-5 h-5" /></a></div>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#FFD34E]">Navegación</h4>
              <ul className="space-y-4 text-white/60 font-medium">
                <li><a className="hover:text-white transition-colors" href="#">Inicio</a></li><li><a className="hover:text-white transition-colors" href="#servicios">Servicios</a></li><li><a className="hover:text-white transition-colors" href="#nosotros">Sobre Nosotros</a></li><li><a className="hover:text-white transition-colors" href="#contacto-form">Contacto</a></li><li><a className="hover:text-white transition-colors" href="/login">Portal Admin</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#4ECDC4]">Contacto</h4>
              <ul className="space-y-6 font-medium">
                <li className="flex gap-4 text-white/60"><MapPin className="w-5 h-5 shrink-0 text-[#4ECDC4]" /><span>Avenida Villazon Km 5, Calle La Rinconada, <br/>Cochabamba, Bolivia</span></li>
                <li className="flex gap-4 text-white/60"><Phone className="w-5 h-5 shrink-0 text-[#4ECDC4]" /><span>+591 72284858</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 font-bold uppercase tracking-wider text-[10px]">
            <p>© 2026 Casa dei Bambini - Ecosistema Educativo</p>
            <div className="flex gap-8"><a className="hover:text-white transition-colors" href="#">Privacidad</a><a className="hover:text-white transition-colors" href="#">Términos</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}