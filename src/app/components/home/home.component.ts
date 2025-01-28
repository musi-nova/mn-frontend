import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RouterLink, ChartModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  data: any;
  options: any;
  activeButton: string = 'Indie Rock';

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.initializeChartData();
  }

  initializeChartData() {
    const fileName = this.activeButton.toLowerCase().replace(' ', '-') + '.json';
    this.http.get<any>(`assets/${fileName}`).subscribe((data: any) => {
      this.data = data;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  initializeChartOptions() {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false, // Turn off the initial animation
      plugins: {
        legend: {
          display: false // Hide the legend
        },
        title: {
          display: true,
          text: 'Followers of the playlist & Listeners of one song at the playlist',
          align: 'start',
          font: {
            size: 18
          },
          padding: {
            top: 10,
            bottom: 10
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Metrics', // X-axis label
            align: 'start', // Align the label to the top
            font: {
              size: 14
            },
            padding: {
              top: 0,
              bottom: 10
            }
          },
          ticks: {
            display: false // Hide x-axis labels
          },
          grid: {
            display: false // Hide x-axis grid lines
          }
        },
        y: {
          ticks: {
            display: false, // Hide y-axis labels
            maxTicksLimit: 5 // Limit the number of y-axis ticks
          },
          grid: {
            display: true // Show y-axis grid lines
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0 // Hide the dots on the lines
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
      backgroundColor: '#ffffff' // Set the background color to white
    };
  }

  updateChartData(genre: string, event: Event) {
    const fileName = genre.toLowerCase().replace(' ', '-') + '.json';
    this.http.get<any>(`assets/${fileName}`).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.activeButton = genre;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}