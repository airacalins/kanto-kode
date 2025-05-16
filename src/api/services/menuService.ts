import { Menu } from "../../types/Menu";

const BASE_URL = "http://172.20.10.11:3000";

export const fetchMenus = async (): Promise<Menu[]> => {
  const res = await fetch(`${BASE_URL}/menus`);
  if (!res.ok) throw new Error("Failed to fetch menus");
  return res.json();
};
