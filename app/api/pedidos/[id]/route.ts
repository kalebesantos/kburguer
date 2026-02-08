import { NextResponse } from "next/server";
import { pedidos } from "../_db";
import { Pedido } from "../types";

// PATCH → atualizar status do pedido
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const pedido: Pedido | undefined = pedidos.find(
      (p) => p.id === id
    );

    if (!pedido) {
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 }
      );
    }

    if (body.status) {
      pedido.status = body.status;
    }

    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar pedido" },
      { status: 500 }
    );
  }
}
