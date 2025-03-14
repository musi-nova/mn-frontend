import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCarouselComponent } from './ad-carousel.component';

describe('AdCarouselComponent', () => {
  let component: AdCarouselComponent;
  let fixture: ComponentFixture<AdCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
