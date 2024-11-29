import express from 'express';
import {db} from './Cards.js';
import mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session'
const app = express();
const PORT = 3000;
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors({
    origin: 'http://localhost:4200', // Replace with your Angular app's origin
    credentials: true,
}));
let connection = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'MyNewPass',
    database: 'flashcards'
});


const sessionConfig = {
  secret: 'MYSECRET',
  name: 'appName',
  resave: false,    
  saveUninitialized: false,
  cookie : {
    sameSite: 'none', // THIS is the config you are looking for.
  }
};

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1); // trust first proxy
//   sessionConfig.cookie.secure = true; // serve secure cookies
// }

app.use(session(sessionConfig))



app.get('/decks', async (req, res)=>{
    //TOOD check if there are any cookies
    if (!req.cookies){
        res.status(404).send('failed no cookie');
        return;
    }
    if(!req.cookies.username || !req.cookies.username.uid){
        // console.log(req.cookies.username)
        // console.log(req.cookies.username.uid)
        return res.status(400).send("You must log in.");
    }
    let uid = req.cookies.username.uid;

    if(!uid){
        return res.status(400).send("Missing user in cookies.");
    }
    try{
        console.log('my uid is', req.cookies.username.uid);
        let [rows, fields] = await connection.execute('select * from decks d where uid = ?', [req.cookies.username.uid]);
        console.log(rows);
        if(rows.length === 0){
            return res.status(404).send("There are no decks.");
        }
        console.log("decks: ");
        console.log(rows);
        res.status(200).json(rows);
    } catch (error){
        res.status(400).send("Request invalid.");
    }
    
});

app.get('/decks/:did', async (req, res)=>{
    try{
        let [rows, fields] = await connection.execute('select name, did from decks where did = ? and uid = ?', [req.params.did, req.cookies.username.uid]);
        // console.log("deck by id: ");
        // console.log(rows);
        let deckname = rows[0].name;
        let did = rows[0].did;
        let cards = await db.getCards(did);
        // console.log(cards);
        res.status(200).json(cards[0]);//returns array of cards in deck
    } catch (error){
        res.status(400).send("Request invalid.");
    }
});

app.post('/decks', async(req,res)=>{
    if (!req.cookies.username){
        res.status(404).send('failed no cookie');
    }
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
        db.addCardstoDeck(did, arrofcards);
        res.status(200).send('added cards')
        return;
    }
    catch{
        res.status(400);
    }
    // await db.addCardstoDeck(1, arrofc )
    

});

app.get('/logout', (req,res) =>{
    res.clearCookie('username');
    res.send(200, 'cleared cookies');
});

app.post('/login', async (req, res)=>{
    let name = req.body.name;
    console.log('name is', name);
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