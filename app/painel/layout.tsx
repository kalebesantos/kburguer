import Link from "next/link";

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8">🍔 Painel Admin</h1>

        <nav className="flex flex-col gap-4">
          <Link
            href="/painel"
            className="hover:text-yellow-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/painel/pedidos"
            className="hover:text-yellow-400 transition"
          >
            Pedidos
          </Link>

          <Link
            href="/painel/produtos"
            className="hover:text-yellow-400 transition"
          >
            Produtos
          </Link>

          <Link
            href="/painel/configuracoes"
            className="hover:text-yellow-400 transition"
          >
            Configurações
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
