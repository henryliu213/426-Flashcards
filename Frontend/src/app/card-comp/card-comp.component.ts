import { Component,Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-card-comp',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-comp.component.html',
  styleUrl: './card-comp.component.css'
})
export class CardCompComponent {
  @Input() front = 'hello';
  @Input() back  = 'goodbye';
}
