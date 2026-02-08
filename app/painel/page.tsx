"use client";

import { useEffect, useState } from "react";

type Pedido = {
  id: string;
  cliente: string;
  itens: { nome: string; qtd: number }[];
  total: number;
  status: string;
  criadoEm: string;
};

const STATUS_FLOW: Record<string, string> = {
  recebido: "preparando",
  preparando: "pronto",
  pronto: "entregue",
};

function statusColor(status: string) {
  switch (status) {
    case "recebido":
      return "bg-yellow-500 text-black";
    case "preparando":
      return "bg-blue-500 text-white";
    case "pronto":
      return "bg-green-500 text-black";
    case "entregue":
      return "bg-zinc-700 text-white";
    default:
      return "bg-zinc-500 text-white";
  }
}

export default function PainelPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarPedidos() {
    try {
      const res = await fetch("/api/pedidos", { cache: "no-store" });
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("Erro ao carregar pedidos", err);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus(id: string, novoStatus: string) {
    const res = await fetch(`/api/pedidos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });

    if (!res.ok) {
      const erro = await res.text();
      console.error("Falha ao atualizar status", erro);
      alert("Erro ao atualizar pedido");
      return;
    }

    carregarPedidos();
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📦 Painel de Pedidos</h1>

      {pedidos.length === 0 && (
        <p className="text-zinc-400">Nenhum pedido recebido ainda.</p>
      )}

      <div className="space-y-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-zinc-800 rounded-lg p-6 border border-zinc-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Cliente: {pedido.cliente}</p>
                <p className="text-sm text-zinc-400">
                  Pedido #{pedido.id.slice(0, 6)}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${statusColor(
                  pedido.status
                )}`}
              >
                {pedido.status}
              </span>
            </div>

            <ul className="mt-4 space-y-1">
              {pedido.itens.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item.nome} — {item.qtd}x
                </li>
              ))}
            </ul>

            <p className="mt-3 font-semibold">
              Total: R$ {pedido.total.toFixed(2)}
            </p>

            {STATUS_FLOW[pedido.status] && (
              <button
                onClick={() =>
                  atualizarStatus(
                    pedido.id,
                    STATUS_FLOW[pedido.status]
                  )
                }
                className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 cursor-pointer"
              >
                {pedido.status === "recebido" && "Preparar"}
                {pedido.status === "preparando" && "Marcar como pronto"}
                {pedido.status === "pronto" && "Entregar"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
