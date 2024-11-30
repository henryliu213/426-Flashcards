import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCompComponent } from './card-comp/card-comp.component';
import { NgFor, NgIf } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { CardsviewComponent } from './cardsview/cardsview.component';
import { ListdecksviewComponent } from './listdecksview/listdecksview.component';
import { HttpClientModule } from '@angular/common/http';
import { ControllerService } from './controller.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardCompComponent, LoginViewComponent, CardsviewComponent, ListdecksviewComponent, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  constructor(private controller: ControllerService){};

  title = 'FlashCards';
  isLogin(){
    return this.controller.getstate() == 'login';
  }
  isDecks(){
    return this.controller.getstate() == 'decks';
  }
  isCards(){
    return this.controller.getstate() == 'cards';
  }
}
