export type Pedido = {
  id: string
  cliente: string
  itens: any[]
  total: number
  status: string
  criadoEm: string
}

// simula banco em memória
export const pedidos: Pedido[] = globalThis.pedidos || []
globalThis.pedidos = pedidos
