await fetch('http://localhost:3000/login',{
    method: 'POST',
    body: JSON.stringify({
        name: 'asdf'
    })
})
console.log('hi');
let a = await fetch('http://localhost:3000/decks');
a = await a.json();
console.log(a)