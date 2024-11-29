import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCompComponent } from './card-comp/card-comp.component';
import { NgFor, NgIf } from '@angular/common';
import { LoginViewComponent } from './login-view/login-view.component';
import { CardsviewComponent } from './cardsview/cardsview.component';
import { ListdecksviewComponent } from './listdecksview/listdecksview.component';
import { ApplicationConfig } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardCompComponent, LoginViewComponent, CardsviewComponent, ListdecksviewComponent, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'FlashCards';
  isLogin(){
    return true;
  }
  isDecks(){
    return false;
  }
  isCards(){
    return false;
  }
}
