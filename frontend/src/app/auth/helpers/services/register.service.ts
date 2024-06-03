import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  URI: string = 'http://localhost:8080/auth/register';

  constructor(private httpClient: HttpClient) {}

  createNewUser(
    email: string,
    password: string,
    username: string
  ): Observable<any> {
    return this.httpClient.post(this.URI, {
      email: email,
      password: password,
      username: username,
    });
  }
}
