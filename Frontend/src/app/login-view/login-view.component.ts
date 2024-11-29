import { NgClass, NgIf } from '@angular/common';
import { Component,input } from '@angular/core';
import { stringify } from 'querystring';
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
    let a;
    try{
      this.myserv.login(namey).subscribe({
        next: ()=> console.log('logged in'),
        error: ()=> console.log('log in failed'),
        complete: ()=>{
          console.log('complete')
          this.myserv.getDecks().subscribe({
            next: value=> a = value,
            error: err => console.log('failed yucky stinky'),
            complete: ()=>console.log('Observable emitted the complete notification')
          });
        }
      });
      
      // await fetch('http://localhost:3000/login',{
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: "hello"
      //   })
      // })
      // let a= await fetch("http://localhost:3000/decks");
      // a = await a.json();
      console.log('hi', a);
      console.log('yay');
    }catch{
      console.log('yikes');
    }
  }

}
