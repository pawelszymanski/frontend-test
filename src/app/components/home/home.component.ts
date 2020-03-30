import {Component, OnInit} from '@angular/core';

import {ApiService} from '../../services/api.service';
import {ApiItemsResponseAdapterService} from '../../services/api-items-response-adapter.service';
import {ApiItemsGetResponse} from '../../services/models/api-items-get-response.definition';

import {Item} from './models/item.definition';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search = '';

  items: Item[] = [];

  // TODO: do something cool with this
  isLoading = false;
  isError = false;

  constructor(
    private apiService: ApiService,
    private apiItemsResponseAdapterService: ApiItemsResponseAdapterService
  ) {}

  filteredItems(): Item[] {
    const normalizedSearch = this.search.trim().toUpperCase();
    return this.items.filter(item => item.title.toUpperCase().indexOf(normalizedSearch) > -1)
  }

  loadItems(): void {
    this.isLoading = true;
    this.isError = false;
    this.apiService.getItems()
      .toPromise()
      .then((itemsApiGetResponse: ApiItemsGetResponse) => {
        this.items = this.apiItemsResponseAdapterService.getItems(itemsApiGetResponse);
        this.isError = false;
      })
      .catch((error) => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      })
  }

  ngOnInit() {
    this.loadItems();
  }

}
