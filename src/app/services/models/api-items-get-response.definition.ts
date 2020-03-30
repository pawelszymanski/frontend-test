export interface ItemRecord {
  id: number;
  title: string;
  parent_id: number;
}

export type ApiItemsGetResponse = ItemRecord[];
