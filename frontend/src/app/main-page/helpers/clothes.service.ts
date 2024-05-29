import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  URI: string = 'http://localhost:8080/clothes';

  constructor(private httpClient: HttpClient) {}

  getListOfClothes(): Observable<any> {
    return this.httpClient.get(this.URI).pipe(
      map((res: any) => {
        return res;
      }),
      delay(200)
    );
  }

  createNewClothing(
    name: string,
    category: string,
    gender: string,
    size: string,
    price: number
  ): Observable<any> {
    return this.httpClient.post(this.URI, {
      name: name,
      category: category,
      gender: gender,
      size: size,
      price: price,
    });
  }

  deleteClothing(id: string): Observable<any> {
    return this.httpClient.delete(`${this.URI}/${id}`, {});
  }

  editProduct(
    id: string,
    name: string,
    category: string,
    gender: string,
    size: string,
    price: number
  ): Observable<any> {
    return this.httpClient.put(`${this.URI}/${id}`, {
      name: name,
      category: category,
      gender: gender,
      size: size,
      price: price,
    });
  }
}
