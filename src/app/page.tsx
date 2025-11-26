'use client';

import { Input, Button, Card, CardHeader, CardBody, Link } from "@heroui/react";
import { signIn } from "next-auth/react"; // Função mágica de login
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Tenta logar usando o NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Não redireciona automático para podermos tratar erros
    });

    if (result?.error) {
      alert("Erro: " + result.error);
      setLoading(false);
    } else {
      // Sucesso! Vai para o painel
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-medium">
        <CardHeader className="flex flex-col gap-1 items-center pb-6">
          <div className="w-12 h-12 bg-primary rounded-xl mb-2 flex items-center justify-center">
            🧪
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mr3-Lab</h1>
          <p className="text-gray-500 text-sm">Acesse o sistema para continuar</p>
        </CardHeader>
        
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input 
              name="email" 
              type="email" 
              label="E-mail" 
              placeholder="admin@mr3.com" 
              variant="bordered" 
              required
            />
            
            <Input 
              name="password" 
              type="password" 
              label="Senha" 
              placeholder="••••••" 
              variant="bordered" 
              required
            />
            
            <Button color="primary" type="submit" isLoading={loading} className="font-bold shadow-md">
              Entrar no Sistema
            </Button>

            <div className="flex justify-center mt-2">
              <p className="text-sm text-gray-500">
                Não tem acesso? <Link href="/register" className="font-bold text-primary">Criar conta</Link>
              </p>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}