// A stand-in database for the demo. Files ending in .server.ts never reach the browser.
export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string;
  userEmail: string;
  name: string;
  address: string;
  items: OrderItem[];
  total: number;
};

export const users = [
  {
    id: "u1",
    email: "sam@example.com",
    name: "Sam",
    password: "password",
  },
];

export const orders = new Map<string, Order>();

export function createOrder(order: Omit<Order, "id">) {
  const id = String(1000 + orders.size + 1);
  orders.set(id, { id, ...order });
  return id;
}
