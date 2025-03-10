import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _httpClient: HttpClient) {}

  specialChar: string = '#';
  encodedChar: string = encodeURIComponent(this.specialChar);
  ordersNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  onlinePayment(data: object, cartId: string): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://e-commers-fresh-cart-owtm.vercel.app/${this.encodedChar}`,
      {
        shippingAddress: data,
      }
    );
  }

  cashPayment(data: object, cartId: string): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      }
    );
  }

  getAllUserOrders(id: string): Observable<any> {
    return this._httpClient.get(
      `${environments.baseUrl}/api/v1/orders/user/${id}`
    );
  }

  checkoutPayMant(id: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      }
    );
  }
}
