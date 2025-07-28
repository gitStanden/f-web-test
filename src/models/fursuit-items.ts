export class FursuitItem {
  item: string;
  price: number;
  itemType: ItemType;
  quantity?: number;
}

export enum ItemType {
  mainItem = 0,
  extraItem = 1,
}