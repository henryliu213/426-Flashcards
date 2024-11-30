import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private state = 'login';
  private did = -1;
  private cardstoadd = [];

  constructor() { }
  getstate(){
    return this.state;
  }
  setState(s:string){
    this.state = s;
  } 
  setdid(i:number ){
    this.did = i;
  }
  getdid(){
    return this.did;
  }
}
