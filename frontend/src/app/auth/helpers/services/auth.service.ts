import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInPayload } from '../interfaces/login.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sesion: { token: string | null } = { token: '' };

  constructor(private httpClient: HttpClient, private router: Router) {
    if (sessionStorage.getItem('userToken')) {
      this.sesion.token = sessionStorage.getItem('userToken');
    }

    if (localStorage.getItem('userToken')) {
      this.sesion.token = localStorage.getItem('userToken');
    }
  }

  getToken(): string | null {
    return this.sesion.token;
  }

  getSesion(): { token: string | null } {
    return this.sesion;
  }

  setToken(value: string): void {
    this.sesion.token = value;
  }

  logOut() {
    this.sesion.token = null;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  LogIn(payload: LogInPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/auth/login', payload);
  }
}
