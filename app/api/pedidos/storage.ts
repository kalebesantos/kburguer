export type Pedido = {
  id: string;
  cliente: string;
  itens: { nome: string; qtd: number }[];
  total: number;
  status: "recebido" | "preparando" | "pronto";
  criadoEm: string;
};

// storage global
const globalForPedidos = globalThis as unknown as {
  pedidos?: Pedido[];
};

if (!globalForPedidos.pedidos) {
  globalForPedidos.pedidos = [];
}

export const pedidos = globalForPedidos.pedidos;
