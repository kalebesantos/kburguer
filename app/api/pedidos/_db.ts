import { Pedido } from "./types";

/**
 * Tipagem global para evitar erro no build da Vercel
 */
declare global {
  // eslint-disable-next-line no-var
  var pedidos: Pedido[] | undefined;
}

/**
 * Simula um banco de dados em memória
 * (APENAS PARA DEV / DEMO)
 */
export const pedidos: Pedido[] = globalThis.pedidos ?? [];

globalThis.pedidos = pedidos;
