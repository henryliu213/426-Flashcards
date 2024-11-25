import express from 'express';
import {Deck,Cards,Flashcards} from './Cards.js';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
app.use(cookieParser());
app.get('/deck', (req, res)=>{
    console.log(req.cookies);
    res.send(req.cookies)
});

app.get('/deck/:did', (req, res)=>{
    if(Flashcards.exists())
    res.send(200).json(Flashcards.getbyid(req.query.did).json());
});

app.get('/logout', (req,res) =>{
    res.clearCookie('username');
    res.send(200, 'cleared cookies')
});

app.get('/user', (req, res)=>{
    let user = {
        name: 'hi',
        uid: 1
    };
    res.cookie("username", user).send(200);
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