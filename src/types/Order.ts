import { Menu } from "./Menu";

export type Order = {
  id: string;
  menus: Menu[];
  timeStamp: Date;
};
