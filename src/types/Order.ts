export type OrderedItem = {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderedItem[];
  timestamp: Date;
};
