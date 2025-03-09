import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsService } from '../../services/tools.service'; // Import ToolsService
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-playlist-checker',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './playlist-checker.component.html',
  styleUrls: ['./playlist-checker.component.scss'],
})
export class PlaylistCheckerComponent {
  playlistId: string = '';
  playlistData: any = null; // Store playlist data

  constructor(private toolsService: ToolsService) {} // Inject ToolsService

  checkPlaylist() {
    this.toolsService.getPlaylistChecker(this.playlistId).pipe(
      tap((result) => {
        this.playlistData = result;
        console.log('Checker results:', result);
      }),
      catchError((error) => {
        console.error('Error checking playlist:', error);
        return of(null); // Return a null observable to handle the error
      })
    ).subscribe();
  }
}