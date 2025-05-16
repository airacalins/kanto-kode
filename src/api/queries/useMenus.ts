import { useQuery } from "@tanstack/react-query";
import { Menu } from "../../types/Menu";
import { fetchMenus } from "../services/menuService";
import { useMenuStore } from "../../store/useMenuStore";

export const useMenus = () => {
  return useQuery<Menu[], Error>({
    queryKey: ["menus"],
    queryFn: fetchMenus,
  });
};
