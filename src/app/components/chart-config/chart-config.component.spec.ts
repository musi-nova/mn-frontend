import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConfigComponent } from './chart-config.component';

describe('ChartConfigComponent', () => {
  let component: ChartConfigComponent;
  let fixture: ComponentFixture<ChartConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
