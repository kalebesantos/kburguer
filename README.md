# 🍔 K-Burguer – Sistema de Pedidos para Hamburgueria

K-Burguer é um projeto de **sistema completo para hamburgueria**, desenvolvido com **Next.js 13 (App Router)**, **React** e **Tailwind CSS**.  
Permite que clientes visualizem o cardápio, adicionem produtos ao carrinho, finalizem pedidos, e que a equipe da cozinha/admin gerencie os pedidos em tempo real.

---

## **🖥 Funcionalidades**

### Cliente
- Visualização do cardápio com imagens quadradas e descrições.
- Modal de seleção de opções:
  - Pão obrigatório (ex.: Brioche, Australiano)
  - Extras opcionais (ex.: Bacon, Salada) com preço adicional
- Carrinho global com **badge dinâmica** no header.
- Checkout simples: nome, telefone, endereço (simulado).
- Envio de pedido via API.

### Painel Admin
- Dashboard com estatísticas de pedidos.
- Lista de pedidos recebidos em tempo real.
- Atualização de status do pedido:
  - `recebido → preparando → pronto → entregue`
- CRUD de produtos e categorias (opcional para versão final).
- Sidebar fixa com navegação entre páginas do painel.

---

## **🛠 Tecnologias Utilizadas**

- **Next.js 13 (App Router)** – Frontend e backend integrado.
- **React + Hooks** – Estado global, interatividade.
- **Tailwind CSS** – Estilização rápida e responsiva.
- **Context API** – Gerenciamento global do carrinho.
- **UUID** – Identificadores únicos para pedidos e produtos.
- **API Routes** – Endpoints de produtos e pedidos.
- **Modal customizado** – Seleção de opções do produto.
- **Polling / SSE (opcional)** – Atualização de pedidos em tempo real.

---

## **📁 Estrutura de Pastas**

