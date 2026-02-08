"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCarrinho } from "../context/CarrinhoContext";

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
};

type Adicional = {
  nome: string;
  preco: number;
};

const paes = [
  { nome: "Pão Brioche", preco: 0 },
  { nome: "Pão Australiano", preco: 2 },
];

const adicionais: Adicional[] = [
  { nome: "Bacon", preco: 3 },
  { nome: "Queijo extra", preco: 2 },
  { nome: "Salada", preco: 1.5 },
];

export default function CardapioPage() {
  const { adicionarItem } = useCarrinho();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [pao, setPao] = useState<string | null>(null);
  const [extras, setExtras] = useState<Adicional[]>([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  function toggleExtra(extra: Adicional) {
    setExtras(prev =>
      prev.some(e => e.nome === extra.nome)
        ? prev.filter(e => e.nome !== extra.nome)
        : [...prev, extra]
    );
  }

  function precoFinal() {
    if (!produtoSelecionado) return 0;
    const extrasTotal = extras.reduce((s, e) => s + e.preco, 0);
    const paoPreco = paes.find(p => p.nome === pao)?.preco || 0;
    return produtoSelecionado.preco + extrasTotal + paoPreco;
  }

  function adicionarPedido() {
    if (!pao) {
      alert("Escolha o pão");
      return;
    }

    adicionarItem({
      nome: produtoSelecionado!.nome,
      preco: precoFinal(),
      extras: [pao, ...extras.map(e => e.nome)],
    });

    setProdutoSelecionado(null);
    setPao(null);
    setExtras([]);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">🍔 Cardápio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map(produto => (
          <div key={produto.id} className="bg-zinc-900 rounded-xl overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={produto.imagem || "/placeholder.jpg"}
                alt={produto.nome}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold">{produto.nome}</h2>
              <p className="text-sm text-zinc-400">{produto.descricao}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-green-400 font-bold">
                  R$ {produto.preco.toFixed(2)}
                </span>

                <button
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                  onClick={() => setProdutoSelecionado(produto)}
                >
                  Escolher
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {produtoSelecionado && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-2">{produtoSelecionado.nome}</h2>
            <p className="text-sm text-zinc-400 mb-4">{produtoSelecionado.descricao}</p>

            {/* PÃO */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Escolha o pão *</h3>
              {paes.map(p => (
                <label key={p.nome} className="flex justify-between items-center mb-2 cursor-pointer">
                  <span>{p.nome}</span>
                  <input
                    type="radio"
                    name="pao"
                    checked={pao === p.nome}
                    onChange={() => setPao(p.nome)}
                  />
                </label>
              ))}
            </div>

            {/* ADICIONAIS */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Adicionais</h3>
              {adicionais.map(extra => (
                <label key={extra.nome} className="flex justify-between items-center mb-2 cursor-pointer">
                  <span>{extra.nome} (+R$ {extra.preco.toFixed(2)})</span>
                  <input
                    type="checkbox"
                    checked={extras.some(e => e.nome === extra.nome)}
                    onChange={() => toggleExtra(extra)}
                  />
                </label>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="text-green-400 font-bold">R$ {precoFinal().toFixed(2)}</span>
            </div>

            {/* AÇÕES */}
            <div className="flex gap-3">
              <button className="flex-1 bg-zinc-700 py-2 rounded" onClick={() => setProdutoSelecionado(null)}>
                Cancelar
              </button>
              <button className="flex-1 bg-yellow-400 text-black py-2 rounded" onClick={adicionarPedido}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
