import { create } from "zustand";
import { Menu } from "../types/Menu";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type MenuStore = {
  menus: Menu[];
  sortedMenus: () => Menu[];
  setMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, "id">) => void;
};

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [],
  sortedMenus: () =>
    [...get().menus].sort((a, b) => a.name.localeCompare(b.name)),
  setMenus: (menus) => set({ menus }),
  addMenu: (menu) =>
    set((state) => ({
      menus: [...state.menus, { ...menu, id: uuidv4() }],
    })),
}));
