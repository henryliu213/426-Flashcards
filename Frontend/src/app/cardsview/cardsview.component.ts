import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { ControllerService } from '../controller.service';
import { MyservService } from '../myserv.service';
import { CardCompComponent } from '../card-comp/card-comp.component';
@Component({
  selector: 'app-cardsview',
  standalone: true,
  imports: [ NgIf,NgFor, CardCompComponent],
  templateUrl: './cardsview.component.html',
  styleUrl: './cardsview.component.css'
})
export class CardsviewComponent {
  cardsbigman: any;
  constructor(private controller:ControllerService, private serv: MyservService){};
  ngOnInit(){
    let i = this.controller.getdid();
    console.log(i);
    this.serv.getDeckById(i).subscribe({
      next: value=> {
        this.cardsbigman = value;
        console.log(this.cardsbigman);

      }
    })
  }
}
