import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-config',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart-config.component.html',
  styleUrls: ['./chart-config.component.scss']
})
export class ChartConfigComponent implements OnInit, OnChanges {
  @Input() activeButton: string = 'Indie Rock';
  data: any;
  options: any;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.initializeChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeButton'] && !changes['activeButton'].isFirstChange()) {
      this.updateChartData(this.activeButton);
    }
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
          display: true, // Show the legend
          position: 'bottom', // Position the legend to the bottom
        },
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
          title: {
            display: true,
            text: 'Popularity', // Y-axis label
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

  updateChartData(genre: string) {
    const fileName = genre.toLowerCase().replace(' ', '-') + '.json';
    this.http.get<any>(`assets/${fileName}`).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.cdr.detectChanges(); // Trigger change detection
    });
  }
}