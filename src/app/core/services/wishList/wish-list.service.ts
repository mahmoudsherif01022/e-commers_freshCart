import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private httpClient: HttpClient) {}
  addProductWishList(id: string): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }
  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/api/v1/wishlist`);
  }

  removeProductWishList(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environments.baseUrl}/api/v1/wishlist/${id}`

      // https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1
    );
  }
}
