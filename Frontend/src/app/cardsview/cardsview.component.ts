import { Component, OnInit } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
import { ControllerService } from '../controller.service';
import { MyservService } from '../myserv.service';
import { CardCompComponent } from '../card-comp/card-comp.component';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { EditDeckComponent } from '../edit-deck/edit-deck.component';
import { ListdecksviewComponent } from '../listdecksview/listdecksview.component';
@Component({
  selector: 'app-cardsview',
  standalone: true,
  imports: [ NgIf,NgFor, CardCompComponent, CommonModule, FormsModule, ReactiveFormsModule, EditDeckComponent, ListdecksviewComponent],
  templateUrl: './cardsview.component.html',
  styleUrl: './cardsview.component.css'
})


export class CardsviewComponent {
  cardsbigman: any;
  did: number = 0;

  myForm = this.fb.group({
    addedCards: this.fb.array([this.fb.group(
      {
        front: ["", Validators.required],
        back: ["", Validators.required]
      }
    )])
});

  constructor(private controller:ControllerService, private serv: MyservService, private fb: FormBuilder, private change: ChangeDetectorRef){};
  ngOnInit(){
    this.did = this.controller.getdid();
    this.serv.getDeckById(this.did).subscribe({
      next: value=> {
        this.cardsbigman = value;
      }
    })
  }

  // get addedCards(){
  //   return this.myForm.get('addedCards') as FormArray;
  // }

  // addSlot(){
  //   this.addedCards.push(
  //     this.fb.group(
  //       {
  //         front: ["", Validators.required],
  //         back: ["", Validators.required]
  //       }
  //     )
  //   );
  // }

  // deleteaddCard(index: number){
  //   this.addedCards.removeAt(index);
  // }

  // submit(){
  //   console.log('hello');
  //   let listy = this.addedCards as FormArray;
  //   let val = listy.at(0).get('front')?.value;
  //   console.log(listy.length);
  //   let arr = [];
  //   let len = listy.length;
  //   for (let i = 0; i < len; i++){
  //     arr.push(
  //       {
  //         front: listy.at(i).get('front')?.value,
  //         back: listy.at(i).get('back')?.value
  //       }
  //     );
  //   }
  //   console.log(arr);
  //   this.serv.addCardstoDeck(arr, this.did).subscribe(
  //     {
  //       next: ()=>{
  //         this.ngOnInit();
  //         // this.serv.getDeckById(this.did).subscribe({
  //         //   next: value=> {
  //         //     this.cardsbigman = value;
  //         //   }
  //         // })
  //         // this.change.detectChanges();
  //       }
  //     }

  //   );

  // }


  edit(){
    this.controller.setState('edit');
  }
  back(){
    this.controller.setState('decks');
  }

}
// <div [formGroup]="myGroup">
//   <div formArrayName="cities">
//     <div *ngFor="let city of cityArray.controls; index as i">
//       <input [formControlName]="i">
//     </div>
//   </div>
// </div>