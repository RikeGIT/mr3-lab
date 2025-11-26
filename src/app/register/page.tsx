'use client';

import { Input, Button, Card, CardHeader, CardBody, Link } from "@heroui/react";
import { registerUser } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionar depois

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
    } else {
      alert("Conta criada com sucesso! Faça login.");
      router.push("/"); // Manda o usuário para a Home (futura tela de login)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold text-primary">Crie sua Conta</h1>
          <p className="text-gray-500 text-sm">Bem-vindo ao Mr3-Lab</p>
        </CardHeader>
        
        <CardBody>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input 
              name="name" 
              label="Nome Completo" 
              placeholder="Ex: Ricardo Silva" 
              variant="bordered" 
              required
            />
            <Input 
              name="email" 
              type="email" 
              label="E-mail" 
              placeholder="seu@email.com" 
              variant="bordered" 
              required
            />
            <Input 
              name="password" 
              type="password" 
              label="Senha" 
              placeholder="******" 
              variant="bordered" 
              required
            />
            
            <Button color="primary" type="submit" isLoading={loading} className="mt-2 font-bold">
              Cadastrar
            </Button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Já tem conta? <Link href="/" className="text-primary font-bold">Entrar</Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}