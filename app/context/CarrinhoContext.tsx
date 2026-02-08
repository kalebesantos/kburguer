"use client";

import { createContext, useContext, useState } from "react";

type ItemCarrinho = {
  nome: string;
  preco: number;
  extras: string[];
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionarItem: (item: ItemCarrinho) => void;
  limparCarrinho: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  function adicionarItem(item: ItemCarrinho) {
    setItens(prev => [...prev, item]);
  }

  function limparCarrinho() {
    setItens([]);
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho fora do Provider");
  return ctx;
}
