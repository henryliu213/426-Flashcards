import mysql from "mysql2/promise"
let connection = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'MyNewPass',
    database: 'flashcards'
})

export class db{
    connection = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: 'MyNewPass',
        database: 'flashcards'
    })
    async getCard(cid){  //probs useless
        let [row, fields] = await connection.execute("select * from cards where cid = ?", [cid]); 
        let front = row[0]['front'];
        let back = row[0]['back'];
        return {
            front: front,
            back: back
        }
    }



}
export class Flashcards{
    static decks = [];
    static addDeck(deck){
        Flashcards.decks.push(deck);
    }
    static deleteDeck(did){
        Flashcards.decks = Flashcards.decks.filter((e)=> e.did != did);
    }
    static exists(did){
        let a = false;
        for (let decky of Flashcards.decks){
            if (decky.did == did){
                return a = true;
            }
        }
        return a;
    }
    static getbyid(did){
        for (let decky of Flashcards.decks){
            if (decky.did == did){
                return decky;
            }
        }
    }

    static jsonbyuser(user){
        let result = Flashcards.decks.filter((e)=>e.user == user);
        return result;
    }
    static json(){
        return {
            decks: Flashcards.decks
        }
    }

}

export class Cards{
    values;
    cid;
    static count = 0;
    constructor(front, back){
        this.values = [front,back];
        this.id = Cards.count++;
    }
    json(){
        return {
            values: this.values,
            cid: this.cid
        }
    }
}
export class Deck{
    cards = [];
    name;
    did;
    user;
    static count = 0;
    constructor(cards, user, name){
        this.cards = cards;
        this.name = name;
        this.user = user;
        this.did = Deck.count++;
    }  

    get name(){
        return this.name;
    }
    get cards(){
        return [...this.cards];
    }
    get did(){
        return this.did;
    }
    get user(){
        return this.user;
    }
    json(){
        return {
            cards: this.cards,
            name: this.name,
            did: this.did,
            user: this.user
        }
    }
}


let cardy = new Cards('hello',2);
let decky = new Deck([cardy],'user', 'mydeck');
let decky2 = new Deck([new Cards("poo", 'hi')], 'usr2', '2sdeck');
Flashcards.addDeck(decky2);
Flashcards.addDeck(decky);
let res = Flashcards.json();
console.log(Flashcards.jsonbyuser('usr2'));
//console.log(res['decks'][0]['cards'][0]['values'][0]);

