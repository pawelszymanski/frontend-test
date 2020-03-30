import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// import {ApiItemsGetResponse} from './models/api-items-get-response.definition';

@Injectable()
export class ApiService {

  private BASE_URL = 'http://localhost:3000/';

  private URLS = {
    items: 'items'
  };

  constructor(
    private http: HttpClient
  ) {}

  // TODO: not sure why Observable<ApiItemsGetResponse> is a problem
  public getItems(): Observable<any> {
    const url = this.BASE_URL + this.URLS.items;
    return this.http.get(url);
  }

}
