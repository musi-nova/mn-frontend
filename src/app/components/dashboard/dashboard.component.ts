import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ChartModule, // Add ChartModule
    CommonModule,
    SidebarComponent,
    FormsModule, // Add FormsModule
    ReactiveFormsModule // Add ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInformation = {
    name: '',
    email: 'placeholder',
    password: ''
  };

  userPlaylists: any[] = [];
  userPlaylistSummary: any;
  userArtistTopTracks: any[] = [];
  playlistJobs: any[] = [];
  isSidebarClosed = true;
  selectedPlaylist: any;
  chartData: any;
  chartOptions: any;
  secondChartData: any;
  secondChartOptions: any;

  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadUserInfo();
    this.loadUserPlaylistJobs();
  }

  loadUserInfo() {
    this.userService.getUserInfo().pipe(
      tap((response: any) => {
        this.userInformation = response;
      }),
      catchError((error: any) => {
        console.error('Error fetching user info:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user information' });
        return of(null); // Return an observable with a null value
      })
    ).subscribe();
  }

  loadUserPlaylistJobs() {
    this.userService.getUserPlaylistJobs().pipe(
      tap((response: any) => {
        console.log('Jobs:', response);
        this.playlistJobs = response;
        if (this.playlistJobs.length > 0) {
          this.selectedPlaylist = this.playlistJobs[0];
          this.onPlaylistChange({ value: this.selectedPlaylist });
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching user jobs:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user playlist jobs' });
        return of(null); // Return an observable with a null value
      })
    ).subscribe();
  }

  loadUserPlaylistSummary(playlistId: string, campaignId: string) {
    this.userService.getUserPlaylistSummary(playlistId, campaignId).pipe(
      tap((response: any) => {
        console.log('Summary:', response);
        this.userPlaylistSummary = response;
        this.prepareSecondChartData();
      }
      ),
      catchError((error: any) => {
        console.error('Error fetching user playlist summary:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user playlist summary' });
        return of(null); // Return an observable with a null value
      })
    ).subscribe();
  }

  loadUserPlaylist(playlistId: string, campaignId: string) {
    this.userService.getUserPlaylist(playlistId, campaignId).pipe(
      tap((response: any) => {
        console.log('Playlists:', response);
        this.userPlaylists = response;
        this.prepareChartData();
      }),
      catchError((error: any) => {
        console.error('Error fetching user playlists:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user playlists' });
        return of(null); // Return an observable with a null value
      })
    ).subscribe();
  }

  loadUserArtistTopTracks(artistId: string) {
    this.userService.getUserArtistTopTracks(artistId).pipe(
      tap((response: any) => {
        console.log('Top tracks:', response);
        this.userArtistTopTracks = response;
      }),
      catchError((error: any) => {
        console.error('Error fetching user artist top tracks:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user artist top tracks' });
        return of(null); // Return an observable with a null value
      })
    ).subscribe();
  }

  prepareChartData() {
    const labels = this.userPlaylists.map(playlist => new Date(playlist.created_at).toLocaleDateString());
    const followersData = this.userPlaylists.map(playlist => playlist.followers_total);
    const spendData = this.userPlaylists.map(playlist => playlist.spend); // Assuming 'spend' is a property in userPlaylists

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Total Followers',
          data: followersData,
          fill: false,
          backgroundColor: "rgba(102, 187, 106, 0.34)",
          borderColor: '#66BB6A',
          yAxisID: 'y'
        },
        {
          label: 'Spend',
          data: spendData,
          fill: true,
          backgroundColor: "rgba(70, 19, 21, 0.34)",
          borderColor: '#461315',
          yAxisID: 'y1'
        }
      ]
    };

    this.chartOptions = {
      animation: false, // Turn off the initial animation
      responsive: true,
      plugins: {
        legend: {
          display: true, // Show the legend
          position: 'bottom', // Position the legend to the bottom
        },
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 2 // Hide the dots on the lines
        }
      },
      layout: {
        padding: {
          left: 20, // Add padding to the left
          right: 20, // Add padding to the right
          top: 20, // Add padding to the top
          bottom: 20 // Add padding to the bottom
        }
      },
      scales: {
        x: {
          ticks: {
            callback: (value: any, index: any) => {
              return this.chartData.labels[index]; // Return the label for the value
            },
            maxTicksLimit: 5 // Limit the number of x-axis ticks
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            display: true, // Show y-axis labels
            maxTicksLimit: 4 // Limit the number of y-axis ticks
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            display: true, // Show y-axis labels
            maxTicksLimit: 4 // Limit the number of y-axis ticks
          },
        }
      }
    };
  }

  prepareSecondChartData() {
    // Create a set of unique dates for the labels
    const uniqueDates = Array.from(new Set(this.userArtistTopTracks.map(track => new Date(track.created_at).toLocaleDateString())));
  
    // Group data by track_id
    const trackDataMap = new Map();
    this.userArtistTopTracks.forEach(track => {
      if (!trackDataMap.has(track.track_id)) {
        trackDataMap.set(track.track_id, {
          label: track.track_name,
          data: new Array(uniqueDates.length).fill(null), // Initialize with null values
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          fill: false,
          yAxisID: 'y'
        });
      }
      const dateIndex = uniqueDates.indexOf(new Date(track.created_at).toLocaleDateString());
      trackDataMap.get(track.track_id).data[dateIndex] = track.track_popularity;
    });
  
    // Convert map to array of datasets
    const datasets = Array.from(trackDataMap.values());
  
    this.secondChartData = {
      labels: uniqueDates,
      datasets: datasets
    };
  
    this.secondChartOptions = {
      animation: false, // Turn off the initial animation
      responsive: true,
      plugins: {
        legend: {
          display: true, // Show the legend
          position: 'bottom', // Position the legend to the bottom
        },
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 2 // Hide the dots on the lines
        }
      },
      layout: {
        padding: {
          left: 20, // Add padding to the left
          right: 20, // Add padding to the right
          top: 20, // Add padding to the top
          bottom: 20 // Add padding to the bottom
        }
      },
      scales: {
        x: {
          ticks: {
            callback: (value: any, index: any) => {
              return this.secondChartData.labels[index]; // Return the label for the value
            },
            maxTicksLimit: 5 // Limit the number of x-axis ticks
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            display: true, // Show y-axis labels
            maxTicksLimit: 4 // Limit the number of y-axis ticks
          },
        },
      }
    };
  }
  
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  onSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

  onPlaylistChange(event: any) {
    const selectedJob = this.playlistJobs.find(job => job.playlist_id === event.value.playlist_id);
    if (selectedJob) {
      this.loadUserPlaylist(selectedJob.playlist_id, selectedJob.campaign_id);
      this.loadUserPlaylistSummary(selectedJob.playlist_id, selectedJob.campaign_id);
      this.loadUserArtistTopTracks(selectedJob.artist_id);
    }
  }
  navigateToNewCampaign() {
    this.router.navigate(['/new-campaign']);
  }
}