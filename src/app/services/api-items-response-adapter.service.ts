import {Injectable} from '@angular/core';

import * as lodash from 'lodash';

import {ItemRecord} from './models/api-items-get-response.definition';
import {Item} from '../components/home/models/item.definition';
import {Node} from './models/node.definition';

@Injectable()
export class ApiItemsResponseAdapterService {

  private SORT_BY_PROP_NAME: 'id';

  private nodes: Node[] = [];

  private createNodeMap(apiResponse: ItemRecord[]): void {
    this.nodes = apiResponse.map(item => ({id: item.id, parentId: item.parent_id, childrenIds: []}));

    this.nodes.forEach(node => {
      if (node.parentId) {
        this.nodes.find(n => n.id === node.parentId).childrenIds.push(node.id)
      }
    });

    this.nodes.forEach(node => {node.depth = this.getNodeDepth(node);});
  }

  private getNodeById(id: number): Node {
    return this.nodes.find(n => n.id === id);
  }

  private getNodeDepth(node: Node): number {
    if (node.parentId === null) {return 0;}

    let parentId = node.parentId;
    let depth = 1;
    while (this.getNodeById(parentId).parentId !== null) {
      parentId = this.getNodeById(parentId).parentId;
      depth++;
    }
    return depth;
  }

  private adaptItem(itemRecord: ItemRecord): Item {
    return {
      id: itemRecord.id,
      title: itemRecord.title,
      parentId: itemRecord.parent_id,
      childrenIds: this.getNodeById(itemRecord.id).childrenIds,
      depth: this.getNodeById(itemRecord.id).depth
    }
  }

  private getSortedChildrenItems(parentId: number, apiResponse: ItemRecord[]): Item[] {
    const unsortedItems = apiResponse
      .filter(i => i.parent_id === parentId)
      .map(i => this.adaptItem(i));
    const sortedItems = lodash.sortBy(unsortedItems, this.SORT_BY_PROP_NAME);

    const result = [];
    sortedItems.forEach(item => {
      result.push(item, this.getSortedChildrenItems(item.id, apiResponse));
    });
    return lodash.flatten(result);
  }

  public getItems(apiResponse: ItemRecord[]): Item[] {
    this.createNodeMap(apiResponse);
    return this.getSortedChildrenItems(null, apiResponse);
  }

}
