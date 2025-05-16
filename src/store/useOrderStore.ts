import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../types/Order";

type OrderStore = {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Omit<Order, "id" | "timestamp">) => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  getOrder: (id) => get().orders.find((order) => order.id === id),
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          ...order,
          id: uuidv4(),
          timestamp: new Date(),
        },
      ],
    })),
}));
