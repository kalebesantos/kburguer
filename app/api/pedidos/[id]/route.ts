import { NextResponse } from "next/server";
import { pedidos } from "../storage";

/* =========================
   PATCH /api/pedidos/:id
========================= */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  const { status } = body;

  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return NextResponse.json(
      { error: "Pedido não encontrado" },
      { status: 404 }
    );
  }

  pedido.status = status;

  return NextResponse.json(pedido);
}
