import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { Section1Component } from './section-1/section-1.component';
import { Section2Component } from './section-2/section-2.component';
import { Section3Component } from './section-3/section-3.component';
import { Section4Component } from './section-4/section-4.component';
import { Section5Component } from './section-5/section-5.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ContactUsComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
