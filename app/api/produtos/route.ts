import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

let produtos = [
  {
    id: "1",
    nome: "Chesse Burguer",
    descricao: "Hamurgúer 150g , queijo cheddar fatiado, maionese da casa.",
    preco: 33,
    imagem: "/burgers/chesseburguer.jpg",
  },
  {
    id: "2",
    nome: "Bacon Burguer",
    descricao: "Hambúrguer 150g, queijo cheddar fatiado, bacon, molho barbecue, cebola roxa , picles e maionese da casa",
    preco: 29,
    imagem: "/burgers/baconburguer.jpg",
  },
];

// LISTAR PRODUTOS
export async function GET() {
  return NextResponse.json(produtos);
}

// CRIAR PRODUTO (ADMIN)
export async function POST(req: Request) {
  const body = await req.json();

  const novoProduto = {
    id: randomUUID(),
    nome: body.nome,
    descricao: body.descricao,
    preco: body.preco,
    imagem: body.imagem,
  };

  produtos.push(novoProduto);

  return NextResponse.json(novoProduto, { status: 201 });
}
