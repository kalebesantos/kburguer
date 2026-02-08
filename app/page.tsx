import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">🍔 K Burguer</h1>
      <p className="text-zinc-400">Hambúrguer artesanal</p>

      <Link
        href="/cardapio"
        className="px-6 py-3 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-400"
      >
        Ver Cardápio
      </Link>
    </main>
  );
}
