import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { ControllerService } from '../controller.service';
import { MyservService } from '../myserv.service';
import { CardCompComponent } from '../card-comp/card-comp.component';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
@Component({
  selector: 'app-cardsview',
  standalone: true,
  imports: [ NgIf,NgFor, CardCompComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cardsview.component.html',
  styleUrl: './cardsview.component.css'
})


export class CardsviewComponent {
  cardsbigman: any;
  myForm = this.fb.group({
    addedCards: this.fb.array([this.fb.group(
      {
        front: ["", Validators.required],
        back: ["", Validators.required]
      }
    )])
});

  constructor(private controller:ControllerService, private serv: MyservService, private fb: FormBuilder){};
  ngOnInit(){
    let i = this.controller.getdid();
    this.serv.getDeckById(i).subscribe({
      next: value=> {
        this.cardsbigman = value;
      }
    })
  }

  get addedCards(){
    return this.myForm.get('addedCards') as FormArray;
  }

  addSlot(){
    this.addedCards.push(
      this.fb.group(
        {
          front: ["", Validators.required],
          back: ["", Validators.required]
        }
      )
    );
  }

  deleteaddCard(index: number){
    this.addedCards.removeAt(index);
  }

  submit(){
    console.log('hello');
  }


}
// <div [formGroup]="myGroup">
//   <div formArrayName="cities">
//     <div *ngFor="let city of cityArray.controls; index as i">
//       <input [formControlName]="i">
//     </div>
//   </div>
// </div>