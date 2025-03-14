import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private baseUrl = 'https://mn-api.jms.rocks';

  constructor(
    private http: HttpClient
  ) { }

  getPlaylistChecker(
    playlistId: string,
  ) {
    console.log('Calling getPlaylistChecker');
    return this.http.get(`${this.baseUrl}/spotify/playlists/${playlistId}/checker`)
    .pipe(
      tap((response: any) => {
        console.log('Playlist Checker:', response);
      }),
      catchError((error: any) => {
        console.error('Error fetching playlist checker:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}
