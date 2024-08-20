import { HttpClient } from '@angular/common/http';
import { inject, Injectable, numberAttribute } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { map, tap } from 'rxjs';
import { ApiUrls } from './urls';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);

  private accessToken?: string;
  private refreshToken?: string;
  private expiresIn?: number;
  private currentTime = Date.now(); // Current time in milliseconds
  private expirationTime?: number;

  logout() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.expiresIn = undefined;
    this.expirationTime = undefined;
    this.removeTokensFromBrowserStorage();
  }
  removeTokensFromBrowserStorage() {
    window.localStorage.setItem('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
    window.localStorage.setItem('expirationTime', '0');
  }

  loadTokensFromBrowserStorage() {
    const accessToken = window.localStorage.getItem('accessToken');
    const refreshToken = window.localStorage.getItem('refreshToken');
    const expirationTime = window.localStorage.getItem('expirationTime');
    if (!(accessToken || refreshToken || expirationTime)) {
      return;
    }
    this.accessToken = accessToken!;
    this.refreshToken = refreshToken!;
    this.expirationTime = Number(expirationTime!);
  }

  saveTokensInBrowserStorage() {
    window.localStorage.setItem('accessToken', this.accessToken!);
    window.localStorage.setItem('refreshToken', this.refreshToken!);
    window.localStorage.setItem(
      'expirationTime',
      this.expirationTime!.toString()
    );
  }
  isTokenValid() {
    this.currentTime = Date.now(); // Current time in milliseconds
    if (!this.accessToken) {
      return false;
    }
    if (this.currentTime > this.expirationTime!) {
      return false;
    } else {
      return true;
    }
  }

  getNewAccessToken() {
    const refreshTokenForm = new FormData();
    refreshTokenForm.append('refreshToken', this.refreshToken!);
    return this._httpClient
      .post<ApiResponse<AuthResponse>>(
        ApiUrls.auth.getNewAccessToken,
        refreshTokenForm
      )
      .pipe(
        tap({
          next: (res) => {
            if (res.statusCode == 200) {
              this.accessToken = res.data.access_token;
              this.refreshToken = res.data.refresh_token;
              this.expiresIn = res.data.expires_in * 1000; // Convert to milliseconds
              this.currentTime = Date.now(); // Current time in milliseconds
              this.expirationTime = this.currentTime + this.expiresIn;
              this.saveTokensInBrowserStorage();
            }
          },
        })
      )
      .pipe(
        map((res) => {
          if (res.statusCode == 200) {
            return true;
          }
          return false;
        })
      );
  }

  login(email: string, password: string) {
    const loginFormData = new FormData();
    loginFormData.append('Username', email);
    loginFormData.append('Password', password);
    return this._httpClient
      .post<ApiResponse<AuthResponse>>(
        ApiUrls.auth.login,
        // { Username: email, Password: password }
        loginFormData
      )
      .pipe(
        tap({
          next: (res) => {
            if (res.statusCode == 200) {
              this.accessToken = res.data.access_token;
              this.refreshToken = res.data.refresh_token;
              this.expiresIn = res.data.expires_in * 1000; // Convert to milliseconds
              this.currentTime = Date.now(); // Current time in milliseconds
              this.expirationTime = this.currentTime + this.expiresIn;
              this.saveTokensInBrowserStorage();
            }
          },
        })
      )
      .pipe(
        map((res) => {
          if (res.statusCode == 200) {
            return true;
          }
          return false;
        })
      );
  }
}
