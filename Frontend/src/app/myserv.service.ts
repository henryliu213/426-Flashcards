import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class MyservService {

  constructor(private http: HttpClient) { }
  getDecks(){
    return this.http.get("http://localhost:3000/decks", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
  });
  }
  getDeckById(did: number){
    let urly = "http://localhost:3000/decks/"+ did;
    return this.http.get(urly, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }
  login(namey: string){
      return this.http.post("http://localhost:3000/login", {
        name: namey,
      },{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      })
  }
  logout(){
    return this.http.get("http://localhost:3000/logout",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }
  createDeck(namey: string){
    return this.http.post("http://localhost:3000/decks",
      {
        name: namey,
      },{

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
      }
    )
  }
  addCardstoDeck(listier: {front: string, back: string}[],didy:number ) :Observable<any> {
    let res = {
      listy: listier,
      did: didy
    }
    return this.http.post("http://localhost:3000/addtodeck",res, {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });    
  }
  //  {"listy":[
  //       {"front": "firstfront", "back": "firstback"},
  //       {"front": "seond front", "back": "second bac"},
  //       {"front": "third front", "back": "third front"}
  //     ],
  //   "did": 1}
}
