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
  ncardform: any;
  form = this.fb.group({
    newCards: this.fb.array(
      [
      ]
    )
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

  get seenewCards(){
    return this.form.controls['newCards'] as FormArray;
  }

  addCard(){
    this.ncardform = this.fb.group({
      front: ['', Validators.required],
      back: ['', Validators.required]
    })
    this.seenewCards.push(this.ncardform);
  }

  deleteaddCard(index: number){
    this.seenewCards.removeAt(index);
  }

  submit(){
    let firstControl = this.seenewCards.get(['list', 0]);
    console.log(firstControl);
  }


}
// <div [formGroup]="myGroup">
//   <div formArrayName="cities">
//     <div *ngFor="let city of cityArray.controls; index as i">
//       <input [formControlName]="i">
//     </div>
//   </div>
// </div>