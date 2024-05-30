import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URI: string = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {}

  getListOfUsers(): Observable<any> {
    return this.httpClient.get(this.URI).pipe(
      map((res: any) => {
        return res;
      }),
      delay(200)
    );
  }
}
