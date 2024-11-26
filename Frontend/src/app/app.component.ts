import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCompComponent } from './card-comp/card-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'FlashCards';
}
