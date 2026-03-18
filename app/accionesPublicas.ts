"use server";

import prisma from '@/lib/prisma';

export async function enviarMensajeContacto(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const telefono = formData.get('telefono') as string;
  const mensaje = formData.get('mensaje') as string;

  await prisma.mensaje.create({
    data: {
      nombre,
      telefono,
      mensaje,
    },
  });

  return { success: true };
}