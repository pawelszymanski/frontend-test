export interface Item {
  id: number;
  title: string;
  parentId: number;
  childrenIds: number[];
  depth: number;
}
