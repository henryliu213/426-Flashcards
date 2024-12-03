import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControllerService } from '../controller.service';
import { MyservService } from '../myserv.service';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardsviewComponent } from '../cardsview/cardsview.component';
@Component({
  selector: 'app-edit-deck',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, EditDeckComponent, CardsviewComponent],
  templateUrl: './edit-deck.component.html',
  styleUrl: './edit-deck.component.css'
})
export class EditDeckComponent {
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
    let listy = this.addedCards as FormArray;
    let val = listy.at(0).get('front')?.value;
    console.log(listy.length);
    let arr = [];
    let len = listy.length;
    for (let i = 0; i < len; i++){
      arr.push(
        {
          front: listy.at(i).get('front')?.value,
          back: listy.at(i).get('back')?.value
        }
      );
    }
    console.log(arr);
    this.serv.addCardstoDeck(arr, this.did).subscribe(
      {
        complete: ()=>{
          this.controller.setState('cards');
        }
      }

    );
    this.controller.setState('cards');

  }
}
