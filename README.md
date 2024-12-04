# 426-Flashcards
We created a flashcards web application. Type the name and press enter. 

We created the frontend with angular driven by controller's state changes and click events. 
Our backend has multiple uses, giving deck name in the get /decks, as well as the cards in get /decks:did to return cards. These getters do not affect the databse, so they are idempotent. We have the ability to post /deck creating a deck, as well as post /addtodeck creating cards and automatically adding them to their respective deck.   

We use two third party apis to generate a random trivial flashcard and a riddle/joke (some are questionable, "wee + poo" = "woo" was one example). 

We have session-persistent state in that all the decks/cards created by a user are linked to their name, and typing the same name again will show the same. The data are stored in an SQL database, so they remain even if our localhost server crashes. 

Here: https://youtu.be/3-pVikOKFS4


