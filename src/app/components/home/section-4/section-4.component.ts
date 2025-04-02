import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { AdCarouselComponent } from '../../ad-carousel/ad-carousel.component';

@Component({
  selector: 'app-section-4',
  standalone: true,
  imports: [CommonModule, AdCarouselComponent],
  templateUrl: './section-4.component.html',
  styleUrl: './section-4.component.scss',
})
export class Section4Component {
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
}
