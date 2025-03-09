import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { IuserTokne } from '../../../shared/interfaces/IuserTokne/iuser-tokne';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // constructor() {}

  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  userData: IuserTokne = {} as IuserTokne;
  userId!: string;

  sendRegisterForm(data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  sendloginrForm(data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  seveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      this.userId = this.userData.id;
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = {} as IuserTokne;
    this._router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  setCodeVerify(data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  setResetPassword(data: object): Observable<any> {
    return this._httpClient.post(
      `${environments.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
