import React from 'react';
import prisma from '@/lib/prisma';
import { Phone, Calendar, Inbox } from 'lucide-react';

export default async function MensajesPage() {
  // Traemos los mensajes ordenados por los más recientes primero
  const mensajes = await prisma.mensaje.findMany({
    orderBy: { fecha: 'desc' }
  });

  return (
    <div className="flex flex-col h-full font-sans">
      {/* HEADER AL ESTILO AESTHETIC */}
      <header className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-1">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            <Inbox className="w-9 h-9 text-[#FFD34E]" />
            Bandeja de Entrada
          </h1>
          <nav className="flex text-xs font-medium text-slate-500 gap-2 items-center">
            <span>Admin</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-[#FFD34E]">Mensajes</span>
          </nav>
        </div>
        
        {/* PÍLDORA DE CONTADOR ESTILO CRISTAL */}
        <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFD34E]/20 text-[#FFD34E] font-bold font-display text-lg">
            {mensajes.length}
          </span>
          <span className="text-slate-300 font-bold text-xs uppercase tracking-wider pr-2">Mensajes totales</span>
        </div>
      </header>

      {/* CONTENEDOR DE TARJETAS */}
      <section className="px-8 flex-1 pb-10 mt-4 animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        {mensajes.length === 0 ? (
          // ESTADO VACÍO AESTHETIC
          <div className="glass-panel rounded-[2.5rem] border border-white/5 p-16 text-center h-[60vh] flex flex-col items-center justify-center shadow-2xl">
            <div className="w-24 h-24 bg-white/5 border border-white/10 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <span className="material-symbols-outlined text-5xl">drafts</span>
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-3">Bandeja impecable</h3>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              El ecosistema está en paz. Cuando los padres envíen sus consultas desde el portal educativo, aparecerán aquí mágicamente.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {mensajes.map((msg, index) => (
              // TARJETAS DE MENSAJES ESTILO CRISTAL OSCURO CON ANIMACIÓN EN CASCADA
              <div 
                key={msg.id} 
                className="glass-card rounded-[2rem] p-8 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decoración luminosa sutil en la esquina */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4ECDC4]/10 rounded-full blur-3xl group-hover:bg-[#4ECDC4]/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar dinámico con la inicial */}
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-inner group-hover:border-[#4ECDC4]/30 transition-colors">
                        {msg.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#4ECDC4] transition-colors">
                          {msg.nombre}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="capitalize">
                            {new Date(msg.fecha).toLocaleDateString('es-ES', {
                              weekday: 'long', day: 'numeric', month: 'long'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Burbuja del mensaje (Fondo azul noche) */}
                  <div className="bg-[#1E293B]/60 rounded-2xl p-6 mb-6 border border-white/5 text-slate-300 leading-relaxed italic text-sm shadow-inner">
                    "{msg.mensaje}"
                  </div>

                  {/* Etiqueta de contacto */}
                  <div className="flex items-center gap-2 text-[#8DE969] font-bold bg-[#8DE969]/10 w-fit px-4 py-2.5 rounded-xl text-xs border border-[#8DE969]/20 shadow-sm">
                    <Phone className="w-4 h-4" />
                    WhatsApp / Tel: {msg.telefono}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}