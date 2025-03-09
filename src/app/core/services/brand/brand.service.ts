import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _httpClient: HttpClient) {}
  getAllBrand(): Observable<any> {
    return this._httpClient.get(`${environments.baseUrl}/api/v1/brands`);
  }

  getSpecificBrand(id: string): Observable<any> {
    return this._httpClient.get(`${environments.baseUrl}/api/v1/brands/${id}`);
  }
}
