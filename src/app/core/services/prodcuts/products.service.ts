import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${environments.baseUrl}/api/v1/products`);
  }

  getSpecificProducts(id: string | null): Observable<any> {
    return this._httpClient.get(
      `${environments.baseUrl}/api/v1/products/${id}`
    );
  }
}
