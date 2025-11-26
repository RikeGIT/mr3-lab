'use client';

import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button 
      className="bg-[#991b1b] text-white data-[hover=true]:bg-[#450a0a]"
      variant="light" 
      onPress={() => signOut({ callbackUrl: "/" })}
    >
      Sair
    </Button>
  );
}