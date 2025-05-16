import { BASE_URL } from "../../config/api";
import { Menu } from "../../types/Menu";

export const fetchMenus = async (): Promise<Menu[]> => {
  const res = await fetch(`${BASE_URL}/menus`);
  if (!res.ok) throw new Error("Failed to fetch menus");
  return res.json();
};
