"use client";

import { useEffect, useState } from "react";

type Pedido = {
  id: string;
  cliente: string;
  itens: { nome: string; qtd: number }[];
  status: string;
  criadoEm: string;
};

const STATUS_FLOW: Record<string, string> = {
  recebido: "preparando",
  preparando: "pronto",
};

function statusColor(status: string) {
  switch (status) {
    case "recebido":
      return "bg-yellow-500 text-black";
    case "preparando":
      return "bg-blue-500 text-white";
    case "pronto":
      return "bg-green-500 text-black";
    default:
      return "bg-zinc-600 text-white";
  }
}

export default function CozinhaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function carregarPedidos() {
    const res = await fetch("/api/pedidos", { cache: "no-store" });
    const data: Pedido[] = await res.json();

    // filtra pedidos ativos
    const ativos = data.filter(
      (p) => p.status !== "entregue"
    );

    setPedidos(ativos);
  }

  async function atualizarStatus(id: string, novoStatus: string) {
    await fetch(`/api/pedidos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });

    carregarPedidos();
  }

  useEffect(() => {
    carregarPedidos();

    const interval = setInterval(() => {
      carregarPedidos();
    }, 3000); // 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">👨‍🍳 Cozinha</h1>

      {pedidos.length === 0 && (
        <p className="text-zinc-400 text-lg">
          Nenhum pedido ativo no momento
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">
                #{pedido.id.slice(0, 6)}
              </span>

              <span
                className={`px-4 py-1 rounded-full text-sm ${statusColor(
                  pedido.status
                )}`}
              >
                {pedido.status}
              </span>
            </div>

            <ul className="space-y-2 mb-4">
              {pedido.itens.map((item, idx) => (
                <li key={idx} className="text-lg">
                  🍔 {item.nome} — {item.qtd}x
                </li>
              ))}
            </ul>

            {STATUS_FLOW[pedido.status] && (
              <button
                onClick={() =>
                  atualizarStatus(
                    pedido.id,
                    STATUS_FLOW[pedido.status]
                  )
                }
                className="w-full py-3 text-lg font-bold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400"
              >
                {pedido.status === "recebido" && "Iniciar preparo"}
                {pedido.status === "preparando" && "Pedido pronto"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
