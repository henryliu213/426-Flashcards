import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyservService {

  constructor(private http: HttpClient) { }
  getDecks(){
    return this.http.get("http://localhost:3000/decks");
  }
  getDeckById(did: number){
    let urly = "http://localhost:3000/decks/"+ did;
    return this.http.get(urly);
  }
  login(namey: string){
      return this.http.post("http://localhost:3000/login", {
        name: namey
      })
  }
  logout(){
    return this.http.get("http://localhost:3000/logout");
  }
  createDeck(namey: string){
    return this.http.post("http://localhost:3000/decks",
      {
        name: namey
      }
    )
  }
  addCardstoDeck(listier: {front: string, back: string}[],didy:number ){
    let res = {
      listy: listier,
      did: didy
    }
    return this.http.post("http://localhost:3000/addtodeck",res);    
  }
  //  {"listy":[
  //       {"front": "firstfront", "back": "firstback"},
  //       {"front": "seond front", "back": "second bac"},
  //       {"front": "third front", "back": "third front"}
  //     ],
  //   "did": 1}
}
