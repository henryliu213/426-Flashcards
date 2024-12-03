import { Component,Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { ControllerService } from '../controller.service';
@Component({
  selector: 'app-decky',
  standalone: true,
  imports: [NgFor],
  templateUrl: './decky.component.html',
  styleUrl: './decky.component.css'
})
export class DeckyComponent {
  constructor(private controller: ControllerService){}
  @Input() obj = {name: '', did:0}; 
  handleClick(){
    this.controller.setdid(this.obj.did);
    this.controller.setState('cards');
    
  }
}
