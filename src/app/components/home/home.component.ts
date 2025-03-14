import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartConfigComponent } from '../chart-config/chart-config.component';
import { AdCarouselComponent } from '../ad-carousel/ad-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, ChartConfigComponent, AdCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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