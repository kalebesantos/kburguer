"use client";

import { useEffect, useState } from "react";

type Item = {
  nome: string;
  qtd: number;
};

type Pedido = {
  id: string;
  cliente: string;
  itens: Item[];
  total: number;
  status: string;
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarPedidos() {
    try {
      const res = await fetch("/api/pedidos", {
        cache: "no-store",
      });

      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("Erro ao carregar pedidos", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedidos();

    // Atualiza a cada 5 segundos (tempo real simples)
    const interval = setInterval(carregarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pedidos</h2>

      {pedidos.length === 0 && (
        <p className="text-zinc-400">Nenhum pedido recebido ainda.</p>
      )}

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-zinc-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  Cliente: {pedido.cliente}
                </p>
                <p className="text-sm text-zinc-400">
                  Status: {pedido.status}
                </p>
              </div>

              <span className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-black">
                {pedido.status}
              </span>
            </div>

            <ul className="text-sm mb-2">
              {pedido.itens.map((item, index) => (
                <li key={index}>
                  {item.nome} — {item.qtd}x
                </li>
              ))}
            </ul>

            <p className="font-bold">Total: R$ {pedido.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
