'use server'

import connectDB from "@/lib/db";
import Equipment from "@/models/Equipment";

export async function createTestItem() {
  try {
    console.log("🔌 Tentando conectar ao banco...");
    await connectDB();
    
    console.log("💾 Criando item de teste...");
    const newItem = await Equipment.create({
      name: "Notebook de Teste (Dell)",
      description: "Este item prova que o banco está funcionando!",
      status: "disponivel"
    });

    console.log("✅ Item criado com ID:", newItem._id);
    return { success: true };
    
  } catch (error) {
    console.error("❌ Erro critico:", error);
    return { success: false };
  }
}