import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartConfigComponent } from '../chart-config/chart-config.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, ChartConfigComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  activeButton: string = 'Indie Rock';
  videos: string[] = [
    'assets/electronic-example.mp4',
    'assets/alt-pop-example.mp4',
    'assets/alt-rock-example.mp4',
    'assets/indie-pop-example.mp4',
  ];
  currentSlide: number = 2;

  ngOnInit() {}

  updateChartData(genre: string) {
    this.activeButton = genre;
  }

  setSlide(index: number) {
    this.currentSlide = index;
    console.log(this.currentSlide);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}