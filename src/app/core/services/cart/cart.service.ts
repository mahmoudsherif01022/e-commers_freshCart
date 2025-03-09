import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}

  cartNumber: WritableSignal<number> = signal(0);

  addProductToCart(id: string): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/cart`,

      {
        productId: id,
      }
    );
  }

  getProductsCart(): Observable<any> {
    return this._httpClient.get(`${environments.baseUrl}/api/v1/cart`);
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environments.baseUrl}/api/v1/cart/${id}`);
  }

  UpdateCartProductQuantity(id: string, newCount: number): Observable<any> {
    return this._httpClient.put(
      `${environments.baseUrl}/api/v1/cart/${id}`,

      {
        count: newCount,
      }
    );
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${environments.baseUrl}/api/v1/cart`);
  }
}
