"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function crearEstudiante(formData: FormData) {
  const nombres = formData.get('nombres') as string;
  const apellidos = formData.get('apellidos') as string;
  const edad = parseInt(formData.get('edad') as string);
  const nivel = formData.get('nivel') as string;
  const nombreTutor = formData.get('nombreTutor') as string;
  const telefonoTutor = formData.get('telefonoTutor') as string;
  const emailTutor = formData.get('emailTutor') as string;
  const alergiasOMedico = formData.get('alergiasOMedico') as string;

  await prisma.estudiante.create({
    data: {
      nombres,
      apellidos,
      edad,
      nivel,
      nombreTutor,
      telefonoTutor,
      emailTutor,
      alergiasOMedico,
    },
  });

  // Esto recarga la tabla de estudiantes automáticamente
  revalidatePath('/estudiantes');
}
// ... (tu función crearEstudiante está aquí arriba) ...

export async function actualizarEstudiante(id: string, formData: FormData) {
  const nombres = formData.get('nombres') as string;
  const apellidos = formData.get('apellidos') as string;
  const edad = parseInt(formData.get('edad') as string);
  const nivel = formData.get('nivel') as string;
  const nombreTutor = formData.get('nombreTutor') as string;
  const telefonoTutor = formData.get('telefonoTutor') as string;
  const emailTutor = formData.get('emailTutor') as string;
  const alergiasOMedico = formData.get('alergiasOMedico') as string;

  await prisma.estudiante.update({
    where: { id },
    data: {
      nombres, apellidos, edad, nivel, nombreTutor, telefonoTutor, emailTutor, alergiasOMedico,
    },
  });

  revalidatePath('/estudiantes');
}

export async function eliminarEstudiante(id: string) {
  await prisma.estudiante.delete({
    where: { id }
  });
  
  revalidatePath('/estudiantes');
}