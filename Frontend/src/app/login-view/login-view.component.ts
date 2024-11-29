import { NgClass, NgIf } from '@angular/common';
import { Component,input } from '@angular/core';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
import { MyservService } from '../myserv.service';
@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  constructor(private myserv: MyservService){}

  async submitusername(namey: string){
    console.log(namey);
    try{
      this.myserv.login(namey);
    console.log('yay');
    }catch{
      console.log('yikes');
    }
  }
  

}
