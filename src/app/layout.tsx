import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MR3-lab",
  description: "Gerenciamento de Equipamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. O Providers TEM que estar em volta do children */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}