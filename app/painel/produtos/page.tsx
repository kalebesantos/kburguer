"use client";

import { useEffect, useState } from "react";

export default function ProdutosAdminPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
  });

  async function carregarProdutos() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function salvarProduto() {
    await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        preco: Number(form.preco),
      }),
    });

    setForm({ nome: "", descricao: "", preco: "", imagem: "" });
    carregarProdutos();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📦 Produtos</h1>

      {/* FORM */}
      <div className="bg-zinc-800 p-4 rounded mb-6 space-y-2">
        <input
          placeholder="Nome"
          className="w-full p-2 rounded bg-zinc-700"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="Descrição"
          className="w-full p-2 rounded bg-zinc-700"
          value={form.descricao}
          onChange={e =>
            setForm({ ...form, descricao: e.target.value })
          }
        />
        <input
          placeholder="Preço"
          type="number"
          className="w-full p-2 rounded bg-zinc-700"
          value={form.preco}
          onChange={e => setForm({ ...form, preco: e.target.value })}
        />
        <input
          placeholder="Imagem (/burgers/xxx.jpg)"
          className="w-full p-2 rounded bg-zinc-700"
          value={form.imagem}
          onChange={e =>
            setForm({ ...form, imagem: e.target.value })
          }
        />

        <button
          onClick={salvarProduto}
          className="bg-green-500 text-black px-4 py-2 rounded"
        >
          Salvar Produto
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-2">
        {produtos.map(produto => (
          <div
            key={produto.id}
            className="bg-zinc-800 p-4 rounded flex justify-between"
          >
            <div>
              <p className="font-semibold">{produto.nome}</p>
              <p className="text-sm text-zinc-400">
                {produto.descricao}
              </p>
            </div>
            <p className="font-bold">
              R$ {produto.preco.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
