import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/apiResponse.model';
import { map, tap } from 'rxjs';

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

  isTokenValid() {
    if (!this.accessToken) {
      return false;
    }
    if (this.currentTime > this.expirationTime!) {
      console.log('Token has expired');
      return false;
    } else {
      console.log('Token is still valid');
      return true;
    }
  }

  login(email: string, password: string) {
    const loginFormData = new FormData();
    loginFormData.append('Username', email);
    loginFormData.append('Password', password);
    return this._httpClient
      .post<ApiResponse<AuthResponse>>(
        `https://localhost:7147/api/User/login`,
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
