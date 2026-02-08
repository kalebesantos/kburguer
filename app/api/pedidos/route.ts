import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { pedidos } from "./_db";
import { Pedido } from "./types";

// GET → listar pedidos
export async function GET() {
  return NextResponse.json(pedidos);
}

// POST → criar pedido
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const novoPedido: Pedido = {
      id: uuid(),
      cliente: body.cliente,
      itens: body.itens,
      total: body.total,
      status: "recebido",
      criadoEm: new Date().toISOString(),
    };

    pedidos.unshift(novoPedido); // mais recente primeiro

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
