import React from 'react';
import prisma from '@/lib/prisma';
import { AccionesEstudiante } from '@/components/AccionesEstudiante';
import { CrearEstudianteModal } from '@/components/CrearEstudianteModal';
import { TopBarActions } from '@/components/TopBarActions';
import { Users, Baby, Palette, Rocket, GraduationCap, Smile } from 'lucide-react';

export default async function EstudiantesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params?.q || '';

  const whereClause = query ? {
    OR: [
      { nombres: { contains: query, mode: 'insensitive' as const } },
      { apellidos: { contains: query, mode: 'insensitive' as const } },
    ]
  } : {};

  const estudiantes = await prisma.estudiante.findMany({
    where: whereClause,
    orderBy: { fechaInscripcion: 'desc' }
  });

  // ESTADÍSTICAS ACTUALIZADAS CON LOS NUEVOS NIVELES
  const totalEstudiantes = estudiantes.length;
  const totalPreparatorio = estudiantes.filter(e => e.nivel === 'Preparatorio').length;
  const totalInicial = estudiantes.filter(e => e.nivel === 'Inicial').length;
  const totalPreKinder = estudiantes.filter(e => e.nivel === 'Pre Kinder' || e.nivel === 'Kinder').length;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-500">
      
      <header className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700 z-20">
        <div className="space-y-1">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800 dark:text-white">Gestión de Estudiantes</h1>
          <nav className="flex text-xs font-medium text-slate-500 gap-2 items-center">
            <span>Admin</span><span>›</span><span className="text-[#4ECDC4] font-bold">Estudiantes</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <TopBarActions />
          <CrearEstudianteModal />
        </div>
      </header>

      {/* TARJETAS DE ESTADÍSTICAS ACTUALIZADAS */}
      <section className="px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 z-10">
        <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm p-4 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFD34E]/10 rounded-2xl flex items-center justify-center text-[#FFD34E]"><Users className="w-6 h-6" /></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Inscritos</p><h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">{totalEstudiantes}</h3></div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm p-4 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-2xl flex items-center justify-center text-[#4ECDC4]"><Baby className="w-6 h-6" /></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Preparatorio</p><h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">{totalPreparatorio}</h3></div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm p-4 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FF6B6B]/10 rounded-2xl flex items-center justify-center text-[#FF6B6B]"><Palette className="w-6 h-6" /></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Inicial</p><h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">{totalInicial}</h3></div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm p-4 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#8DE969]/10 rounded-2xl flex items-center justify-center text-[#8DE969]"><Rocket className="w-6 h-6" /></div>
          <div><p className="text-[10px] text-slate-500 uppercase font-bold">Pre & Kinder</p><h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">{totalPreKinder}</h3></div>
        </div>
      </section>

      {/* ... (Todo el resto del componente de la tabla sigue igual, no necesitas cambiarlo) ... */}

      <section className="px-8 flex-1 pb-10 animate-in fade-in zoom-in-95 duration-700 delay-500 fill-mode-both z-10">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm flex flex-col h-full">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[#4ECDC4] rounded-full"></div>
              <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Perfiles de Aprendizaje {query && `(Buscando: ${query})`}</h2>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full border-separate border-spacing-y-4 px-8">
              <thead>
                <tr className="text-left text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="pb-2 px-4">Estudiante</th>
                  <th className="pb-2 px-4">Programa</th>
                  <th className="pb-2 px-4">Edad</th>
                  <th className="pb-2 px-4">Responsable</th>
                  <th className="pb-2 px-4 text-right">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-slate-500">
                      <Smile className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>{query ? 'No encontramos a nadie con ese nombre.' : 'Aún no hay pequeños pioneros registrados.'}</p>
                    </td>
                  </tr>
                ) : (
                  estudiantes.map((estudiante, index) => (
                    <tr key={estudiante.id} className="group hover:shadow-md transition-all">
                      <td className="px-4 py-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-transparent rounded-l-[1.5rem] border-r-0">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center border-2 border-[#4ECDC4]/30 text-slate-800 dark:text-white font-display font-bold text-lg">
                            {estudiante.nombres.charAt(0)}{estudiante.apellidos.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-lg text-slate-800 dark:text-white font-display">
                              {estudiante.nombres} {estudiante.apellidos}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pionero</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-transparent">
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-full">{estudiante.nivel}</span>
                      </td>
                      <td className="px-4 py-4 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-transparent">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#8DE969] shadow-sm"></div>
                          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{estudiante.edad} años</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 bg-white dark:bg-white/5 border-y border-slate-100 dark:border-transparent">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{estudiante.nombreTutor}</p>
                          <p className="text-[11px] text-slate-500">{estudiante.telefonoTutor}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-transparent rounded-r-[1.5rem] border-l-0">
                        <AccionesEstudiante estudiante={estudiante} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}