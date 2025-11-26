'use client';

import { Button } from "@heroui/react";
import { createTestItem } from "@/actions/teste-db";

export default function Home() {
  
  const handleTest = async () => {
    // Chama a função do servidor
    const resultado = await createTestItem();
    
    if (resultado.success) {
      alert("SUCESSO! 🎉 O item foi salvo no MongoDB Atlas.\n\nConfira o terminal do VS Code para ver os logs.");
    } else {
      alert("ERRO. Verifique o terminal do VS Code para ver o motivo.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
      <h1 className="text-4xl font-bold">Teste Final 🧪</h1>
      <p className="text-gray-400">Clique abaixo para salvar um dado no MongoDB</p>
      
      <Button 
        color="success" 
        size="lg"
        className="font-bold text-white shadow-lg"
        onPress={handleTest}
      >
        Testar Conexão com Banco
      </Button>
    </main>
  );
}