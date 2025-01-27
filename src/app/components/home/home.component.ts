import { animation } from '@angular/animations';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,
    RouterLink,
    ChartModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  data: any;
  options: any;
  activeButton: string = 'Indie Rock';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeChartData();
    this.initializeChartOptions();
  }

  initializeChartData() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Money Spent',
          data: this.generateRandomData(),
          fill: true,
          backgroundColor: 'rgba(70, 19, 21, 0.34)', // Set the fill color with transparency
          borderColor: '#461315'
        },
        {
          label: 'Amount of Views',
          data: this.generateRandomData(),
          fill: false,
          borderColor: '#66BB6A'
        }
      ]
    };
  }

  initializeChartOptions() {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
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
            text: 'Time', // X-axis label
            align: 'end', // Align the label to the top
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
            maxTicksLimit: 10// Limit the number of y-axis ticks
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
          radius: 0.1 // Hide the dots on the lines
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
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: `Money Spent on ${genre}`,
          data: this.generateRandomData(),
          fill: true,
          backgroundColor: 'rgba(70, 19, 21, 0.34)', // Set the fill color with transparency
          borderColor: '#461315'
        },
        {
          label: `Amount of Views for ${genre}`,
          data: this.generateRandomData(),
          fill: false,
          borderColor: '#66BB6A'
        }
      ]
    };
    this.activeButton = genre;
    this.cdr.detectChanges(); // Trigger change detection
  }

  generateRandomData() {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
