export type OrderedItem = {
  menuId: string;
  quantity: number;
  name: string;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderedItem[];
  timestamp: Date;
};
