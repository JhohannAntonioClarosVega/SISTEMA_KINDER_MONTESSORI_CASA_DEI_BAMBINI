"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Pencil, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { actualizarEstudiante, eliminarEstudiante } from '@/app/dashboard/estudiantes/actions';

export function AccionesEstudiante({ estudiante }: { estudiante: any }) {
  // Estados para los modales de acción
  const [openEditar, setOpenEditar] = useState(false);
  const [openBorrar, setOpenBorrar] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [loadingBorrar, setLoadingBorrar] = useState(false);

  // Estados para los modales de ÉXITO
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleEditar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingEditar(true);
    const formData = new FormData(e.currentTarget);
    try { 
      await actualizarEstudiante(estudiante.id, formData); 
      setOpenEditar(false); 
      setShowEditSuccess(true); // <-- Lanzamos éxito
    } 
    catch (error) { console.error(error); } 
    finally { setLoadingEditar(false); }
  };

  const handleBorrar = async () => {
    setLoadingBorrar(true);
    try { 
      await eliminarEstudiante(estudiante.id); 
      setOpenBorrar(false); 
      setShowDeleteSuccess(true); // <-- Lanzamos éxito
    } 
    catch (error) { console.error(error); } 
    finally { setLoadingBorrar(false); }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {/* --- MODAL EDITAR --- */}
      <Dialog open={openEditar} onOpenChange={setOpenEditar}>
        <DialogTrigger asChild>
          <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent hover:bg-[#4ECDC4]/10 dark:hover:bg-[#4ECDC4]/20 hover:text-[#4ECDC4] text-slate-500 dark:text-slate-400 rounded-2xl transition-all shadow-sm dark:shadow-none" title="Editar Perfil">
            <Pencil className="w-5 h-5" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-slate-900 dark:text-white">Editar Estudiante</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">Actualiza los datos del estudiante seleccionado.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditar} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Nombres</Label><Input name="nombres" defaultValue={estudiante.nombres} required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
              <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Apellidos</Label><Input name="apellidos" defaultValue={estudiante.apellidos} required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Edad</Label><Input name="edad" type="number" defaultValue={estudiante.edad} min="1" max="6" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
              <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Módulo Educativo</Label>
                <Select name="nivel" defaultValue={estudiante.nivel} required>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-300"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#0F172A] rounded-xl"><SelectItem value="Preparatorio">Preparatorio</SelectItem><SelectItem value="Inicial">Inicial</SelectItem><SelectItem value="Pre Kinder">Pre Kinder</SelectItem><SelectItem value="Kinder">Kinder</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4"><h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Datos del Tutor</h3>
              <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Nombre Completo</Label><Input name="nombreTutor" defaultValue={estudiante.nombreTutor} required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Teléfono</Label><Input name="telefonoTutor" defaultValue={estudiante.telefonoTutor} required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
                <div className="space-y-2"><Label className="font-bold text-slate-900 dark:text-slate-300">Correo</Label><Input name="emailTutor" defaultValue={estudiante.emailTutor || ''} type="email" className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400" /></div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
              <button type="button" onClick={() => setOpenEditar(false)} className="h-11 px-6 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold transition-all">Cancelar</button>
              <button type="submit" disabled={loadingEditar} className="h-11 px-6 bg-[#1868A9] hover:bg-[#145388] text-white font-bold rounded-xl flex items-center">{loadingEditar ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Actualizar</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- MODAL BORRAR --- */}
      <Dialog open={openBorrar} onOpenChange={setOpenBorrar}>
        <DialogTrigger asChild>
          <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-100 dark:border-transparent hover:bg-[#FF6B6B]/10 dark:hover:bg-[#FF6B6B]/20 hover:text-[#FF6B6B] text-slate-500 dark:text-slate-400 rounded-2xl transition-all shadow-sm dark:shadow-none" title="Eliminar Estudiante">
            <Trash2 className="w-5 h-5" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans">
          <DialogHeader>
            <div className="w-16 h-16 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-8 h-8" /></div>
            <DialogTitle className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center">¿Eliminar Pionero?</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-center mt-2">
              Estás a punto de borrar a <span className="font-bold text-slate-900 dark:text-white">{estudiante.nombres} {estudiante.apellidos}</span>. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 pt-6 border-t border-slate-200 dark:border-white/5 mt-4">
            <button type="button" onClick={() => setOpenBorrar(false)} className="h-11 px-6 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all font-bold">Cancelar</button>
            <button type="button" onClick={handleBorrar} disabled={loadingBorrar} className="h-11 px-6 bg-[#FF6B6B] hover:bg-[#E55A5A] text-white font-bold rounded-xl shadow-lg transition-all flex items-center">
              {loadingBorrar ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />} Sí, eliminar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- MODAL: ÉXITO AL EDITAR --- */}
      <Dialog open={showEditSuccess} onOpenChange={setShowEditSuccess}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans text-center">
          <div className="w-20 h-20 bg-[#4ECDC4]/20 text-[#4ECDC4] rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-bold text-slate-900 dark:text-white text-center">¡Actualizado!</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-center mt-2 text-lg">
              Los datos se guardaron correctamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <button onClick={() => setShowEditSuccess(false)} className="h-12 px-10 bg-[#4ECDC4] hover:bg-[#3dbdb4] text-[#0F172A] font-bold rounded-2xl shadow-lg transition-all">
              Excelente
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- MODAL: ÉXITO AL BORRAR --- */}
      <Dialog open={showDeleteSuccess} onOpenChange={setShowDeleteSuccess}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
            <Trash2 className="w-10 h-10" />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-bold text-slate-900 dark:text-white text-center">Eliminado</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-center mt-2 text-lg">
              El registro ha sido borrado del sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <button onClick={() => setShowDeleteSuccess(false)} className="h-12 px-10 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold rounded-2xl transition-all">
              Aceptar
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}