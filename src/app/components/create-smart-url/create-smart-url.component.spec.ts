import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSmartUrlComponent } from './create-smart-url.component';

describe('CreateSmartUrlComponent', () => {
  let component: CreateSmartUrlComponent;
  let fixture: ComponentFixture<CreateSmartUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSmartUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSmartUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
