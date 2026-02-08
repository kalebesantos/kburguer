"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { itens, limparCarrinho } = useCarrinho();
  const [cliente, setCliente] = useState("");
  const [loading, setLoading] = useState(false);

  const total = itens.reduce((s, i) => s + i.preco, 0);

  async function finalizarPedido() {
    if (!cliente.trim()) {
      alert("Informe seu nome");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, itens, total }),
    });

    if (res.ok) {
      alert("Pedido enviado com sucesso!");
      limparCarrinho();
      router.push("/");
    } else {
      alert("Erro ao enviar pedido");
    }

    setLoading(false);
  }

  if (itens.length === 0) {
    return <p className="p-6 text-center text-zinc-400">Carrinho vazio</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🧾 Finalizar Pedido</h1>

      <div className="mb-4">
        <label className="block text-sm mb-1">Seu nome *</label>
        <input
          className="w-full bg-zinc-900 border border-zinc-700 rounded p-2"
          placeholder="Ex: Kalebe"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>

      <div className="bg-zinc-900 rounded-lg p-4 mb-4">
        <h2 className="font-semibold mb-3">Resumo</h2>
        {itens.map((item, i) => (
          <div key={i} className="mb-2">
            <p className="font-medium">{item.nome}</p>
            <p className="text-sm text-zinc-400">{item.extras.join(", ")}</p>
            <p className="text-sm text-green-400">R$ {item.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-6 font-semibold">
        <span>Total</span>
        <span className="text-green-400">R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={finalizarPedido}
        disabled={loading}
        className="w-full bg-yellow-400 text-black py-3 rounded font-bold disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Finalizar Pedido"}
      </button>
    </div>
  );
}
