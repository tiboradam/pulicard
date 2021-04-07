import { createStore } from 'vuex'
import axios from 'axios'

const baseAPIURL = 'https://deckofcardsapi.com/api/deck/'
const maxRequests = 5
let reRequests = 0
const suits = [
  {
    suit: 'HEARTS',
    symbol: 'Heart.svg'
  },
  {
    suit: 'CLUBS',
    symbol: 'Club.svg'
  },
  {
    suit: 'SPADES',
    symbol: 'Spade.svg'
  },
  {
    suit: 'DIAMONDS',
    symbol: 'Diamond.svg'
  },
]

function ShuffleArray(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log('array',array)
  return array;
}

export default createStore({
  state: {
    error: false,
    initialized: false,
    level: 0, // 0: slots don't change; 1: slots shuffled for the game; 2: slots shuffled for every draw
    gameStatus: 'booting', // initialized; playing; over
    deck: {},
    slots: [],
    card: {},
    loading: false
  },
  getters: {
    deckStackCount(state) {
      return (state.deck.remaining < 6) ? state.deck.remaining : 6
    },
  },
  mutations: {
    SET_ERROR(state,error) {
      state.error = error
    },
    SET_LOADING(state,loading) {
      state.loading = loading
    },
    SET_GAMESTATUS(state,newStatus) {
      state.gameStatus = newStatus
    },
    SET_LEVEL(state,newLevel) {
      state.level = newLevel
    },
    SET_DECK(state,newDeck) {
      state.deck = newDeck
      state.initialized = true
    },
    SET_SLOTS(state,newSlots) {
      state.slots = JSON.parse(JSON.stringify(newSlots));
    },
    SET_REMAINING(state,remaining) {
      state.deck.remaining = remaining
    },
    SET_CARD(state,card) {
      state.card = card
    },
    newSlots(state,newSlots) {
      state.slots = newSlots
    },
    newCard(state,newCard) {
      state.card = newCard
    },
  },
  actions: {
    newGame({commit, dispatch}) {
      dispatch('shuffleDeck')
      commit('SET_CARD', {})
      dispatch('genSlots')
      commit('SET_GAMESTATUS', 'playing')
    },
    endGame({commit}) {
      commit('SET_CARD', {})
      commit('SET_GAMESTATUS', 'initialized')
    },
    genSlots({state,commit}) {
      switch (state.level) {
        case 0:
          commit('SET_SLOTS',suits)
          break;
        case 1:
          commit('SET_SLOTS',ShuffleArray(suits))
          break;
        case 2:
          commit('SET_SLOTS',[])
          break;              
      }
    },
    initGame({commit, dispatch}) {
      const deckid = localStorage.getItem('deckid')
      if (deckid != null) {
        // check if desk exists
        axios.get(baseAPIURL+deckid+'/shuffle/')
        .then(data => {
          if (data.data.shuffled === true) {
            commit('SET_DECK', {
              id: deckid,
              remaining: data.data.remaining
            })
          } else {
            dispatch('getNewDeck')
          }
        })
        .catch(error => {
          console.log('shuffle error',error)
          commit('SET_LOADING', false)
        })
        commit('SET_CARD', {})
        commit('SET_LOADING', false)
        commit('SET_GAMESTATUS', 'initialized')
      } else {
        dispatch('getNewDeck')
      }
    },
    getNewDeck({commit}) {
      commit('SET_LOADING', true)
      axios.get(baseAPIURL+'new/shuffle/?deck_count=1')
        .then(data => {
          commit('SET_DECK', {
            id: data.data.deck_id,
            remaining: data.data.remaining
          })
          localStorage.setItem('deckid', data.data.deck_id)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log('New deck',error)
          commit('SET_ERROR', true)
          commit('SET_LOADING', false)
        })
    },
    shuffleDeck({state,commit}) {
      commit('SET_LOADING', true)
      axios.get(baseAPIURL+state.deck.id+'/shuffle/')
        .then(data => {
          if (data.data.shuffled === true) {
            commit('SET_REMAINING', data.data.remaining)
          }
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log('shuffle error',error)
          commit('SET_ERROR', true)
          commit('SET_LOADING', false)
        })
    },
    drawCard({state,commit,dispatch}) {
      commit('SET_LOADING', true)
      axios.get(baseAPIURL+state.deck.id+'/draw/?count=1')
        .then(data => {
          reRequests = 0
          if (data.data.success === true) {
            commit('SET_CARD', data.data.cards[0])
            if (state.level === 2) {
              commit('SET_SLOTS',ShuffleArray(suits))
            }
            commit('SET_REMAINING', data.data.remaining)
          } else {
            dispatch('shuffleDeck')
          }
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log('draw card error',error)
          if (reRequests < maxRequests) {
            dispatch('drawCard')
            reRequests++
          } else {
            console.log('draw card BIG error',error)
            commit('SET_ERROR', true)
            commit('SET_LOADING', false)
          }
        })
    }
  },
})
