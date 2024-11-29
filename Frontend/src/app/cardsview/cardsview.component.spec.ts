import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsviewComponent } from './cardsview.component';

describe('CardsviewComponent', () => {
  let component: CardsviewComponent;
  let fixture: ComponentFixture<CardsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
