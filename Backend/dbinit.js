import mysql from 'mysql2/promise'
let connection = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'dr4g0n123!',
    database: 'flashcards'
})
await connection.execute(`CREATE TABLE if not exists users(
                            uid int not null auto_increment,
                            name varchar(255) not null unique, 
                            primary key (uid)
                            )`);
await connection.execute(`CREATE TABLE if not exists decks(
                            did int not null auto_increment,
                            name varchar(255) not null unique, 
                            uid int not null, 
                            foreign key (uid) references users(uid),
                            primary key (did)
                            )`);
await connection.execute(`CREATE TABLE if not exists cards(
                            cid int not null auto_increment,
                            front varchar(255) not null, 
                            back varchar(255) not null,
                            did int,
                            foreign key(did) references decks(did) on delete cascade,
                            primary key (cid)
                            )`);

let [row, field] = await connection.execute('show tables')
console.log(row)
console.log('field is',field)
// await connection.execute('insert into users (name) values (?)', ['username']);
// await connection.execute('insert into decks(name, uid) values (?,?)', ['test',1]);
// await connection.execute('insert into decks(name, uid) values (?,?)', ['test1',1]);
// await connection.execute('insert into decks(name, uid) values (?,?)', ['test2',1]);
// await connection.execute('insert into decks(name, uid) values (?,?)', ['test3',1]);


//await connection.execute('insert into cards (front, back, did) values (?,?,?)',['hi','hello', 1]);
//let [rowy, fieldy] = await connection.execute("select * from cards where cid = ?", [1]);
let [rowy, fieldy] = await connection.execute("select * from cards");
console.log('hi', rowy[0]);



connection.end();
console.log("end");
