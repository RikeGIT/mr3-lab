'use server'

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "Preencha todos os campos!" };
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return { error: "Este e-mail já está cadastrado." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return { success: true };
    
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}