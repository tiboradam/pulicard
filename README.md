<p align="center">
    <img width="240" src="https://adamtibor.hu/img/Pulicard.svg" />
    <h1 align="center">PuliCard</h1>
</p>

## App Requirements (brief)
Building a small website around the [Card Deck API](https://deckofcardsapi.com/)

1. The user can draw a card with a button
2. The user has 4 ‘areas’ where to put the drawn card, one for each card type/suit: spades, hearts, clubs and diamond
3. When the users draws the card he has 5 seconds to put it in the right ‘area’ (based on the type of the card) by clicking on the area
4. If the user is able to place all the cards in the correct area he wins the game and a nice modal is shown
5. If the user places a card in the wrong place OR the times runs out a sad modal is shown and the game resets

### [DEMO](https://adamtibor.hu)

## Technology

The application is created via Vue CLI, using **Vue 3**, **Vuex** and **Axios** for the API calls.<br>
ESLint is used with error prevention only, linting on save. <br>
Jest is used for unit testing.

As CSS "framework", I've choosen [**TailwindCSS**](https://tailwindcss.com/) as I wanted to try a framework agnostic approach (meaning no ready made components and styles) this time.. so the "design" is my own. :)

Assets are mainly optimized SVGs. The game logo has the pulilab <strong style="color: #000712;">black</strong> and <strong style="color: #ef3a50;">red</strong> colors. :)

## Remarks

For the timer I used standard **setInterval**. I know it has it's [defects](https://www.youtube.com/watch?v=MCi6AZMkxcU) but in the end I haven't implemented it this solution. It could be done in the next sprint. ;)

As it's a small project, I thought it's ok to leave all the API calls in the vuex store as actions.  <br>
Usually I'm using some kind of repository of my own to organize communication with the back-end.

I felt like making a lot of garbage on the card server by requesting new deck all the time, so the app saves the **deck_id** in localstore and using it if it's available.

I don't know if the card API server does it on purpose or not, but sometimes the "draw card request" gives a **500 error**. If the same request is repeated, then usually gives back the expected result. If this request error is catched, the request is repeated untill the **maxRequest** (constant in vuex store) is reached (default is set to 5). 
If the maxRequest is reached, the application stops with **Critical Error**.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```
