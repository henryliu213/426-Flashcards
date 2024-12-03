import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckyComponent } from './decky.component';

describe('DeckyComponent', () => {
  let component: DeckyComponent;
  let fixture: ComponentFixture<DeckyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeckyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
