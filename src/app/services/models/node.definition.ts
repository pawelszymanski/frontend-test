export interface Node {
  id: number;
  parentId: number;
  childrenIds: number[];
  depth?: number;
}
