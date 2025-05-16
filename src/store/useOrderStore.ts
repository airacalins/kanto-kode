import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderedItem } from "../types/Order";
import { Menu } from "../types/Menu";

type OrderStore = {
  orderHistory: Order[];
  currentOrderItems: OrderedItem[];

  // Order history methods
  getOrder: (id: string) => Order | undefined;
  setOrderHistory: (orders: Order[]) => void;
  addOrderToHistory: (order: Omit<Order, "id" | "timestamp">) => void;

  // Current order methods
  addItemToCurrentOrder: (menu: Menu) => void;
  removeItemFromCurrentOrder: (menuId: string) => void;
  clearCurrentOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orderHistory: [],
  currentOrderItems: [],

  getOrder: (id) => get().orderHistory.find((order) => order.id === id),
  setOrderHistory: (orders) => set({ orderHistory: orders }),

  addOrderToHistory: (order) =>
    set((state) => ({
      orderHistory: [
        ...state.orderHistory,
        {
          ...order,
          id: uuidv4(),
          timestamp: new Date(),
        },
      ],
      currentOrderItems: [],
    })),

  addItemToCurrentOrder: (menu: Menu) => {
    const items = get().currentOrderItems;
    const index = items.findIndex((item) => item.menuId === menu.id);

    if (index === -1) {
      set({
        currentOrderItems: [
          ...items,
          { menuId: menu.id, quantity: 1, name: menu.name, price: menu.price },
        ],
      });
    } else {
      const updated = items.map((item) =>
        item.menuId === menu.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ currentOrderItems: updated });
    }
  },

  removeItemFromCurrentOrder: (menuId) => {
    set({
      currentOrderItems: get().currentOrderItems.filter(
        (item) => item.menuId !== menuId
      ),
    });
  },

  clearCurrentOrder: () => set({ currentOrderItems: [] }),
}));
