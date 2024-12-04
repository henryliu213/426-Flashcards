import express from 'express';
import {db} from './Cards.js';
import mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';//here
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));//here

let connection = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'dr4g0n123!',
    database: 'flashcards'
});

app.get('/decks', async (req, res)=>{
    //TOOD check if there are any cookies
    if(!req.cookies.username || !req.cookies.username.uid){
        
        return res.status(400).send("You must log in.");
    }
    let uid = req.cookies.username.uid;

    if(!uid){
        return res.status(400).send("Missing user in cookies.");
    }
    try{
        let [rows, fields] = await connection.execute('select * from decks d where uid = ?', [req.cookies.username.uid]);
        if(rows.length === 0){
            return res.status(404).send("There are no decks.");
        }
       
        res.status(200).json(rows);
    } catch (error){
        res.status(400).send("Request invalid.");
    }
    
});

app.get('/decks/:did', async (req, res)=>{
    try{
        let [rows, fields] = await connection.execute('select name, did from decks where did = ? and uid = ?', [req.params.did, req.cookies.username.uid]);
        let deckname = rows[0].name;
        let did = rows[0].did;
        let cards = await db.getCards(did);
        res.status(200).json(cards[0]);//returns array of cards in deck
    } catch (error){
        res.status(400).send("Request invalid.");
    }
});

app.post('/decks', async(req,res)=>{
    let uid = req.cookies.username.uid;
    let name = req.body.name;
    try{
        let a =await db.createDeck(name, uid);
        res.status(200).json(a);
        return;
    }
    catch{
        res.status(400).send('failed');
    }
    //await db.createDeck('firstdeck', 1);
});

app.post('/addtodeck', async(req, res)=>{
    let did = req.body.did;
    let arrofcards =req.body.listy;
    try{
        let a = await db.addCardstoDeck(did, arrofcards);
        res.status(201).json(a);
        return;
    }
    catch{
        res.status(400).send('failed');
    }
    // await db.addCardstoDeck(1, arrofc )
    

});

app.get('/logout', (req,res) =>{
    res.clearCookie('username');
    return;
});

app.post('/login', async (req, res)=>{
    let name = req.body.name;
    if (name){
        let user = await db.login(name);
        res.cookie("username", user, {
            sameSite: 'None',
            secure: true, 
            path: '/'
        }).status(200).end();


    }

});


app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
    else{
        console.log("Error occurred, server can't start", error);
    } 
       
    }
);