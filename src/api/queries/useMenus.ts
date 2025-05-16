import { useQuery } from "@tanstack/react-query";
import { Menu } from "../../types/Menu";
import { fetchMenus } from "../services/menuService";

export const useMenus = () => {
  return useQuery<Menu[], Error>({
    queryKey: ["menus"],
    queryFn: fetchMenus,
  });
};
