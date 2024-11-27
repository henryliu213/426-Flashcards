import express from 'express';
import {Deck,Cards,Flashcards} from './Cards.js';
import mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = 3000;
app.use(cookieParser());

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
    }//i dont really think this is working
    let uid = req.cookies.username.uid;

    if(!uid){
        return res.status(400).send("Missing user in cookies.");
    }
    try{
        let [rows, fields] = await connection.execute('select * from decks d where uid = ?', [req.cookies.username.uid]);
        if(rows.length === 0){
            return res.status(404).send("There are no decks.");
        }
        console.log("decks: ");
        console.log(rows);
        res.status(200).json(rows[0]);
    } catch (error){
        res.status(400).send("Request invalid.");
    }
    
});

app.get('/decks/:did', async (req, res)=>{
    try{
        let [rows, fields] = await connection.execute('select name from decks where did = ? and uid = ?', [req.params.did, req.cookies.username.uid]);
        console.log("deck by id: ");
        console.log(row);
        res.status(200).json(row);
    } catch (error){
        res.status(400).send("Request invalid.");
    }
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