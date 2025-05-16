import { create } from "zustand";
import { Menu } from "../types/Menu";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type MenuStore = {
  menus: Menu[];
  getMenu: (id: string) => Menu | undefined;
  setMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, "id">) => void;
  editMenu: (updatedMenu: Menu) => void;
  deleteMenu: (id: string) => void;
};

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [],
  getMenu: (id) => get().menus.find((menu) => menu.id === id),
  setMenus: (menus) => set({ menus }),
  addMenu: (menu) =>
    set((state) => ({
      menus: [...state.menus, { ...menu, id: uuidv4() }],
    })),
  editMenu: (updatedMenu: Menu) => {
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === updatedMenu.id ? { ...menu, ...updatedMenu } : menu
      ),
    }));
  },
  deleteMenu: (id) => {
    set((state) => ({
      menus: state.menus.filter((menu) => menu.id !== id),
    }));
  },
}));
