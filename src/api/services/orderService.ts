import { BASE_URL } from "../../config/api";
import { Order } from "../../types/Order";

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};
