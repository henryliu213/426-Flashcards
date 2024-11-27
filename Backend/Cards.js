import mysql from "mysql2/promise"
let connection = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'MyNewPass',
    database: 'flashcards'
})

export class db{
    static async getCard(cid){  //probs useless
        let [row, fields] = await connection.execute("select * from cards where cid = ?", [cid]); 
        let front = row[0]['front'];
        let back = row[0]['back'];
        return {
            front: front,
            back: back
        }
    }

    static async login(name){
        if (!name){
            return null;
        }
        let [user, trash] =  await connection.execute("select name from users where name = ?", [name]); 
        if (user[0]){
            console.log('found user');
            let [a,b] = await connection.execute('select uid from users where name = ?', [name]);
            user[0]['uid'] = a[0].uid;
            return user[0];
        }else{
            console.log("new user");
            let [row, fields] = await connection.execute("insert into users (name) values (?)", [name]); 
            [row, fields] = await connection.execute("select name, uid from users where name = ?", [name]);
            return row[0];
        }
    }

    static async createDeck(name, uid){ //TRANSACTION NECESSARY? rollback functionality? 
        await connection.execute('insert into decks (name, uid) values(?, ?)', [name, uid]);
        let did = await connection.execute('select did from decks where name = ?', [name]);
        return did[0][0]['did'];
    }
    static async addCardstoDeck(did, arrOfCards){
        for (let ele of arrOfCards){
            //ele needs front, back Make as JSON rn 
            await connection.execute('insert into cards (did, front, back) values (?,?,?)', [did, ele['front'], ele['back']]);
        }
    }
    
    static async deleteDeck(did){
        await connection.execute('delete from decks where did = ?', [did]);
    }
}
console.log(await db.login('hello'));
console.log(await db.createDeck('firstdeck', 1));
let arrofc = [
    {front: 'firstfront', back: 'firstback'},
    {front: 'seond front', back: 'second back'},
    {front: 'third front', back: 'third front'}
]
// await db.addCardstoDeck(1, arrofc )
await db.deleteDeck(1); // Deletes deck of did 1
let [row,field] = await connection.execute('select * from decks');
console.log(row);
