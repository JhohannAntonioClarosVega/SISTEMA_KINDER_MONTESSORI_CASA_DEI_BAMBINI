"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2, CheckCircle2 } from "lucide-react";
import { crearEstudiante } from '@/app/dashboard/estudiantes/actions';

export function CrearEstudianteModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // <-- NUEVO ESTADO PARA EL ÉXITO

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await crearEstudiante(formData);
      setOpen(false); 
      setShowSuccess(true); // <-- ABRIMOS EL MODAL BONITO DE ÉXITO
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MODAL PRINCIPAL DEL FORMULARIO */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-gradient-to-br from-[#4ECDC4] to-blue-500 text-[#0F172A] px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:shadow-lg hover:shadow-[#4ECDC4]/20 transition-all hover:-translate-y-1 group">
            <PlusCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-sans">Nuevo Registro</span>
          </button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-slate-900 dark:text-white">Registrar Estudiante</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">Ingresa los datos del nuevo alumno y de su tutor principal.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Nombres</Label><Input name="nombres" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
              <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Apellidos</Label><Input name="apellidos" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Edad</Label><Input name="edad" type="number" min="1" max="6" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
              
              <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Nivel</Label>
                <Select name="nivel" required>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-300"><SelectValue placeholder="Selecciona un nivel" /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#0F172A] border-slate-200 dark:border-white/10 rounded-xl">
                    <SelectItem value="Preparatorio">Preparatorio</SelectItem>
                    <SelectItem value="Inicial">Inicial</SelectItem>
                    <SelectItem value="Pre Kinder">Pre Kinder</SelectItem>
                    <SelectItem value="Kinder">Kinder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4"><h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Datos del Tutor</h3>
              <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Nombre Completo</Label><Input name="nombreTutor" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Teléfono</Label><Input name="telefonoTutor" required className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
                <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Correo (Opcional)</Label><Input name="emailTutor" type="email" className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>
              </div>
            </div>

            <div className="space-y-2"><Label className="text-slate-900 dark:text-slate-300 font-bold">Info Médica / Alergias</Label><Input name="alergiasOMedico" className="h-12 rounded-xl bg-slate-50 dark:bg-[#1E293B] border-slate-200 dark:border-white/5 text-slate-900 dark:text-white" /></div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
              <button type="button" onClick={() => setOpen(false)} className="h-11 px-6 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all font-bold">Cancelar</button>
              <button type="submit" disabled={loading} className="h-11 px-6 bg-[#8DE969] hover:bg-[#7AD858] text-[#0F172A] font-bold rounded-xl shadow-lg transition-all flex items-center">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Guardar Estudiante
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL SECUNDARIO DE ÉXITO (AESTHETIC) */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 shadow-2xl rounded-[2rem] font-sans text-center">
          <div className="w-20 h-20 bg-[#8DE969]/20 text-[#8DE969] rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-bold text-slate-900 dark:text-white text-center">¡Registro Exitoso!</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-center mt-2 text-lg">
              El nuevo estudiante ha sido guardado correctamente en la base de datos.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <button onClick={() => setShowSuccess(false)} className="h-12 px-10 bg-[#8DE969] hover:bg-[#7AD858] text-[#0F172A] font-bold rounded-2xl shadow-lg transition-all">
              ¡Genial!
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}