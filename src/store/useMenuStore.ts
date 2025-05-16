import { create } from "zustand";
import { Menu } from "../types/Menu";

type MenuStore = {
  menus: Menu[];
  addMenu: (menu: Menu) => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  menus: [],
  addMenu: (menu) => set((state) => ({ menus: [...state.menus, menu] })),
}));
