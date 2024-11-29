import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdecksviewComponent } from './listdecksview.component';

describe('ListdecksviewComponent', () => {
  let component: ListdecksviewComponent;
  let fixture: ComponentFixture<ListdecksviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListdecksviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListdecksviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
