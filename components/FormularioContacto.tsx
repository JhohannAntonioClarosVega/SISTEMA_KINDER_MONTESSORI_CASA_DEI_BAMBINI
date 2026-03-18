"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";
import { enviarMensajeContacto } from '@/app/accionesPublicas';

export function FormularioContacto() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await enviarMensajeContacto(formData);
      setEnviado(true);
      (e.target as HTMLFormElement).reset(); // Limpia el formulario
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold text-stone-800 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-stone-500">Gracias por escribirnos. Te contactaremos a la brevedad.</p>
        <Button onClick={() => setEnviado(false)} variant="outline" className="mt-8 rounded-xl">Enviar otro mensaje</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-stone-600 font-medium">Nombre de mamá/papá</Label>
          <Input id="nombre" name="nombre" required placeholder="Ej. María Fernanda" className="h-14 rounded-xl bg-stone-50/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono" className="text-stone-600 font-medium">Teléfono / WhatsApp</Label>
          <Input id="telefono" name="telefono" required placeholder="Ej. 70012345" className="h-14 rounded-xl bg-stone-50/50" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mensaje" className="text-stone-600 font-medium">¿En qué podemos ayudarte?</Label>
        <textarea 
          id="mensaje" 
          name="mensaje" 
          required 
          rows={4}
          placeholder="Quisiera saber más sobre los costos y horarios del nivel Toddlers..." 
          className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all resize-none"
        ></textarea>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg h-16 rounded-xl transition-all shadow-lg shadow-brand-orange/20">
        {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
        Enviar Mensaje
      </Button>
    </form>
  );
}