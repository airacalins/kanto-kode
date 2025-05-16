import { useQuery } from "@tanstack/react-query";
import { fetchMenus } from "../services/menuService";
import { Order } from "../../types/Order";
import { fetchOrders } from "../services/orderService";

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["order"],
    queryFn: fetchOrders,
  });
};
