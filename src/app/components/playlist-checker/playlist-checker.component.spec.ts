import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCheckerComponent } from './playlist-checker.component';

describe('PlaylistCheckerComponent', () => {
  let component: PlaylistCheckerComponent;
  let fixture: ComponentFixture<PlaylistCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
