import { Component } from '@angular/core';

@Component({
  selector: 'app-card-comp',
  standalone: true,
  imports: [],
  templateUrl: './card-comp.component.html',
  styleUrl: './card-comp.component.css'
})
export class CardCompComponent {
  Front = 'hello';
}
