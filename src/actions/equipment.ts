'use server'

import connectDB from "@/lib/db";
import Equipment from "@/models/Equipment";
import { revalidatePath } from "next/cache";

export async function createEquipment(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");

    await Equipment.create({
      name,
      description,
      status
    });

    // Avisa o Next.js para recarregar a página do dashboard
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteEquipment(id: string) {
  try {
    await connectDB();
    await Equipment.findByIdAndDelete(id);
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { success: false };
  }
}

export async function updateEquipment(id: string, formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");

    await Equipment.findByIdAndUpdate(id, {
      name,
      description,
      status
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return { success: false };
  }
}