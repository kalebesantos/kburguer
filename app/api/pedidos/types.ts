export type PedidoItem = {
  nome: string;
  qtd: number;
};

export type PedidoStatus =
  | "recebido"
  | "preparando"
  | "pronto"
  | "entregue";

export type Pedido = {
  id: string;
  cliente: string;
  itens: PedidoItem[];
  total: number;
  status: PedidoStatus;
  criadoEm: string;
};
