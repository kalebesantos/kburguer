import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { pedidos, Pedido } from "./storage";

/* =========================
   GET /api/pedidos
========================= */
export async function GET() {
  return NextResponse.json(pedidos);
}

/* =========================
   POST /api/pedidos
========================= */
export async function POST(req: Request) {
  const body = await req.json();

  const novoPedido: Pedido = {
    id: randomUUID(),
    cliente: body.cliente,
    itens: body.itens,
    total: body.total,
    status: "recebido",
    criadoEm: new Date().toISOString(),
  };

  pedidos.push(novoPedido);

  return NextResponse.json(novoPedido, { status: 201 });
}
