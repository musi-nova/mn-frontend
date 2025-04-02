import { Component } from '@angular/core';
import { ChartConfigComponent } from '../../chart-config/chart-config.component';
import { HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-3',
  standalone: true,
  imports: [ChartConfigComponent, RouterLink],
  templateUrl: './section-3.component.html',
  styleUrl: './section-3.component.scss',
})
export class Section3Component {
  isMobile: boolean = false;
  activeButton: string = 'Indie Rock';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 200;
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 200;
  }

  updateChartData(genre: string) {
    this.activeButton = genre;
  }
}
