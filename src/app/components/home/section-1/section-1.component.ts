import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartConfigComponent } from '../../chart-config/chart-config.component';

@Component({
  selector: 'app-section-1',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    ChartConfigComponent
  ],
  templateUrl: './section-1.component.html',
  styleUrl: './section-1.component.scss'
})
export class Section1Component {
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
