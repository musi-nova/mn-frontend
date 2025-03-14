import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ad-carousel.component.html',
  styleUrl: './ad-carousel.component.scss'
})
export class AdCarouselComponent {
  textMessages: string[] = [
    '600 new followers in a month',
    '+ 2000 streams in a week',
    'Boost your playlist now',
    'Reach your audience',
  ];
  currentTextIndex: number = 0;

  ngOnInit() {
    this.cycleTextMessages();
  }

  cycleTextMessages() {
    setInterval(() => {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.textMessages.length;
    }
    , 10000);
  }
}
