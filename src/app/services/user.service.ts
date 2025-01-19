import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  // private baseUrl = 'https://mn-api-hvxv.onrender.com';
  private token: string | null = null
  
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`)
    .pipe(
      tap((response: any) => {
        console.log('Users:', response);
      }
    ));
  }
}
