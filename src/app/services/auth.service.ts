import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, RegisterPostData, LoginPostData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://mn-api.jms.rocks';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  registerUser(postData: RegisterPostData) {
    return this.http.post(`${this.baseUrl}/users`, postData);
  }
  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', '')
      .set('client_id', 'string')
      .set('client_secret', 'string');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/login`, body.toString(), { headers })
    .pipe(
      tap((response: any) => {
        this.token = response.access_token;
        console.log('Token:', this.token);
      }
    ));
  }

  getToken(): string | null {
    return this.token;
  }

}