"use client"; // ⚠️ precisa estar na primeira linha

import { ReactNode } from "react";
import { CarrinhoProvider, useCarrinho } from "./context/CarrinhoContext";
import Link from "next/link";
import "./globals.css";

// Header como client component
function Header() {
  const { itens } = useCarrinho(); // hook client agora funciona

  return (
    <header className="bg-zinc-900 p-4 flex justify-between items-center fixed w-full top-0 z-50 shadow-md">
      <Link href="/">
        <span className="text-xl font-bold">🍔 K-Burguer</span>
      </Link>

      <Link href="/checkout" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4"
          />
        </svg>

        {itens.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {itens.length}
          </span>
        )}
      </Link>
    </header>
  );
}

// Layout principal
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="pt-16">
        <CarrinhoProvider>
          <Header />
          {children}
        </CarrinhoProvider>
      </body>
    </html>
  );
}
