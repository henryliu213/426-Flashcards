import express from 'express';
import {Deck,Cards,Flashcards} from './Cards.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
app.use(cookieParser());

app.get('/decks', (req, res)=>{
    console.log(req.cookies);
    //res.send(req.cookies);
    //res.send(200);

    res.status(200).json(Flashcards.jsonbyuser('username'));
    
});

app.get('/decks/:did', (req, res)=>{
    if(Flashcards.exists(req.query.did)){
        //TODO check user is correct, otherwise say they don't have access
        res.status(200).json(Flashcards.getbyid(req.query.did).json());
    }
    res.status(400).send('Deck does not exist');
});

app.get('/logout', (req,res) =>{
    res.clearCookie('username');
    res.send(200, 'cleared cookies');
});

app.get('/user', (req, res)=>{
    let user = {
        name: 'hi',
        uid: 1
    };
    res.cookie("username", user).end();
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