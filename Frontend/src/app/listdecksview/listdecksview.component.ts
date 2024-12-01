import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MyservService } from '../myserv.service';
import { ControllerService } from '../controller.service';
import { DeckyComponent } from '../decky/decky.component';
@Component({
  selector: 'app-listdecksview',
  standalone: true,
  imports: [NgIf,DeckyComponent, NgFor],
  templateUrl: './listdecksview.component.html',
  styleUrl: './listdecksview.component.css'
})
export class ListdecksviewComponent {
  bigman: any 
    constructor(private serv: MyservService, private cont: ControllerService){
    }
    ngOnInit() { 
      this.serv.getDecks().subscribe({
        next: value => this.bigman = value
      })
    }
    createDeck(namey: string){
      console.log('creating!');
      this.serv.createDeck(namey).subscribe({
        next: ()=>{this.serv.getDecks().subscribe({
          next: value => this.bigman = value
        })
        console.log('big man updated!');
      } 
      });
    }

    // getDecks(){
    //   let a;
    //   this.serv.getDecks().subscribe({
    //     next: value => {
    //       a = value;
    //       console.log("a is", a);
    //       return a;
    //     },
    //     error: () => {return null;}
    //   });
    // }
}
