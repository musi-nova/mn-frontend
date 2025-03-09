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
  getUserPlaylistJobs() {
    console.log('Calling getUserJobs');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.baseUrl}/user/playlist/jobs`, { headers })
    .pipe(
      tap((response: any) => {
        console.log('Jobs:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching user jobs:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
  getUserPlaylistSummary(playlistId: string, campaignId: string) {
    console.log('Calling getUserPlaylistSummary');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/playlist/${playlistId}/campaign/${campaignId}/summary`;
    
    return this.http.get(url, { headers })
    .pipe(
      tap((response: any) => {
        console.log('Summary:', response);
      }
      ),
      catchError((error: any) => {
        console.error('Error fetching user playlist summary:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
  getUserPlaylist(playlistId: string, campaignId: string) {
    console.log('Calling getUserPlaylist');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/playlist/${playlistId}/campaign/${campaignId}`;

    return this.http.get(url, { headers })
    .pipe(
      tap((response: any) => {
        console.log('Playlist:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching user playlist:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
  getUserArtistTopTracks(artistId: string) {
    console.log('Calling getUserArtistTopTracks');
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/user/artist/${artistId}/top-tracks`;

    return this.http.get(url, { headers })
    .pipe(
      tap((response: any) => {
        console.log('Top Tracks:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching user artist top tracks:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}