export class FursuitItem {
  item: string;
  price: number;
  itemType: ItemType
}

export enum ItemType {
  mainItem = 0,
  extraItem = 1,
}