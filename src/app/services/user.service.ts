import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService to get the token

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://mn-api.jms.rocks';
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserInfo() {
    console.log('Calling getUserInfo');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/user`, { headers })
    .pipe(
      tap((response: any) => {
        console.log('User:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching user info:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
  getUserPlaylists() {
    console.log('Calling getUserPlaylists');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/user/playlist`, { headers })
    .pipe(
      tap((response: any) => {
        console.log('Playlists:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching user playlists:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}