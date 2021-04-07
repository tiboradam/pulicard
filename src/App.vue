<template>
  <div class="h-screen w-screen overflow-hidden">
    <transition name="fade">
      <div class="flex items-center justify-center h-screen w-screen text-4xl" v-if="$store.state.gameStatus === 'booting'">
        Initializing game engine...
      </div>
      <div class="relative flex flex-col h-screen" v-else>
        <div class="fixed flex flex-col items-center justify-center w-full py-4 shadow-md">
          <div v-if="$store.state.gameStatus === 'initialized'" class="flex">
            <button @click="startNewGame" class="btn pushable">Start</button>

            <div class="flex items-center gap-2 md:gap-4 ml-2 border-l border-gray-400 rounded-md px-4 cursor-default">
              <div @click="selectLevel(0)" class="py-1 px-2 rounded-md flex items-center border hover:bg-gray-200 level pushable" :class="{'selected': level === 0}">
                <svg viewBox="0 0 24 24" class="w-4">
                  <path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                </svg>
                <span class="text-sm ml-1">Easy</span>
              </div>
              <div @click="selectLevel(1)" class="py-1 px-2 rounded-md flex items-center border hover:bg-gray-200 level pushable" :class="{'selected': level === 1}">
                <svg viewBox="0 0 24 24" class="w-4 text-blue-500">
                  <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                <span class="text-sm ml-1">Normal</span>
              </div>
              <div @click="selectLevel(2)" class="py-1 px-2 rounded-md flex items-center border hover:bg-gray-200 level pushable" :class="{'selected': level === 2}">
                <svg viewBox="0 0 24 24" class="w-4 text-red-500">
                  <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                <span class="text-sm ml-1">Hard</span>
              </div>
            </div>

          </div>
          <div v-if="$store.state.gameStatus === 'playing'" class="flex items-center">
            <button @click="endGame" class="btn pushable">End game</button>
            <div class="ml-4 text-xl sm:text-2xl">Deck: {{$store.state.deck.remaining}}</div>
            <div class="ml-4 text-xl sm:text-2xl">Counter: {{decisionCounter}}</div>
          </div>
        </div>
        
        <!-- <div v-if="$store.state.gameStatus === 'playing'" class="debug flex flex-col sm:flex-row items-center justify-center mt-20 p-4">
          <div class="flex flex-row gap-2 w-full" >
            <div class="bg-blue-400 w-1/2 h-40 ">
              <div @click="drawCard" class="relative ml-8 px-8 pushable">
                <img src="/img/card_back.png" class="absolute" :style="{right: (i*3)+'px'}" v-for="i in $store.getters.deckStackCount" :key="i">
              </div>
            </div>
            <div class="bg-green-100 w-1/2">
              <img :src="$store.state.card.image" v-if="$store.state.card.image" class="w-full"> 
              <div v-else class="flex items-center justify-center h-44 sm:h-card w-32 sm:w-card font-mono text-9xl text-gray-400 border rounded-xl border-gray-400">
                ?
              </div>
            </div>
          </div>
        </div> -->

        <transition name="switch" mode="out-in">
          <div v-if="$store.state.gameStatus === 'playing'" class=" flex flex-col sm:flex-row items-center justify-center mt-20 p-4">
            <div class="flex flex-row gap-2 w-full" >
              <div class="relative z-0 w-1/2 h-card-sm sm:h-card ">
                <div class="absolute inset-0 bg-transparent z-10" v-if="!canChoose">
                </div>
                <div @click="drawCard" class="relative ml-8 px-8 pushable">
                  <img src="/img/card_back.png" class="absolute" :style="{right: (i*3)+'px'}" v-for="i in $store.getters.deckStackCount" :key="i">
                </div>
              </div>
              <div class="h-card-sm sm:h-card w-card-sm sm:w-card">
                <img :src="$store.state.card.image" v-if="$store.state.card.image" class="w-full"> 
                <div v-else class="flex items-center justify-center h-full font-mono text-9xl text-gray-400 border rounded-xl border-gray-400">
                  ?
                </div>
              </div>
            </div> 

            <div class="relative flex flex-wrap sm:flex-nowrap sm:w-3/4 justify-center gap-2 mt-4 sm:mt-0 mx-auto sm:p-8">
              <div class="absolute inset-0 bg-transparent z-10" v-if="canChoose">
              </div>
              <div @click="chooseSlot(slot)" v-for="slot in $store.state.slots" :key="slot.suit" class="relative z-0 card slot flex items-center justify-center" :class="[{'correct': slot.correct === true},{'incorrect': slot.correct === false}]">
                <img :src="/img/+slot.symbol" class="w-24">
              </div>
            </div>  
          </div>
          <Info v-else class="h-full" />
        </transition>

      </div>
    </transition>  
    
    <Toast v-if="showError" />
    <Modal v-show="modal" :mode="mode" @close="endGame" />
  </div>

</template>

<script>
import Modal from './components/Modal'
import Info from './components/Info'
import Toast from './components/Toast'

const decisionTime = 5

export default {
  name: 'App',
  components: {
    Modal,
    Info,
    Toast,
  },
  data() {
    return {
      mode: false,
      decisionTimer: 0,
      decisionCounter: 0
    }
  },
  mounted() {
    this.$store.dispatch('initGame')
  },
  methods: {
    startNewGame() {
      this.$store.dispatch('newGame')
    },
    endGame() {
      this.clearTimer()
      this.$store.dispatch('endGame')
    },
    drawCard() {
      this.$store.dispatch('drawCard')
      this.resetTimer()
    },
    selectLevel(level) {
      this.$store.commit('SET_LEVEL', level)
    },
    chooseSlot(slot) {
      if (slot.suit != this.$store.state.card.suit) {
        this.$store.commit('SET_GAMESTATUS', 'over')
        this.mode = false
      } else if (this.$store.state.deck.remaining === 0) {
        this.$store.commit('SET_GAMESTATUS', 'over')
        this.mode = true
      }
      this.$store.commit('SET_CARD', {})
      this.clearTimer()
    },
    resetTimer() {
      this.clearTimer()
      this.decisionTimer = setInterval(this.incDecisionCounter, 1000);
    },
    clearTimer() {
      if (this.decisionTimer > 0) {        
        clearInterval(this.decisionTimer)
      }
      this.decisionCounter = 0
    },
    incDecisionCounter() {
      this.decisionCounter++
      if (this.decisionCounter === decisionTime) {
        this.$store.commit('SET_GAMESTATUS', 'over')
        this.mode = false

        this.clearTimer()
      }
    },

  },
  computed: {
    initialized() {
      return this.$store.state.initialized
    },
    level() {
      return this.$store.state.level
    },
    modal() {
      return this.$store.state.gameStatus === 'over'
    },
    canChoose() {
      return Object.keys(this.$store.state.card).length === 0 && this.$store.state.card.constructor === Object
    },
    showError() {
      return this.$store.state.error
    }
  },
  watch: {
    showError(newValue) {
      if (newValue === true) {
        this.clearTimer()
      }
    }
  }
}
</script>

<style>
  .debug {
    border: 1px solid red;
  }

  .level.selected {
    @apply border-gray-400;
  }


  body {
    @apply bg-gray-100;
  }

  .btn {
    @apply inline-flex items-center justify-center rounded-md cursor-default border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none;
  }

  .card {
    height: 314px; 
    width: 226px;
    border-radius: 11px;
    overflow: hidden;
  }

  .card.stack {
    width: 244px;
  }

  .card.slot {
    height: 157px; 
    width: 113px;
    box-shadow: inset 0 0 10px silver;
    border: 1px solid transparent;
    transition: all .2s;
  }

  .card.slot:hover {
    box-shadow: 0 0 10px silver;
  }

  .card.slot:active {
    box-shadow: none;
    border: 1px solid silver;
  }

  .card.slot.correct {
    box-shadow: inset 0 0 10px green;
  }

  .card.slot.incorrect {
    box-shadow: inset 0 0 10px red;
  }

  .pushable:active,
  .pushable a:active {
    transform: scale(.96);
  }

  .pushable-xs:active {
    transform: scale(.98);
  }

  .pushable-xl:active {
    transform: scale(.93);
  }

  .pushable-2xl:active {
    transform: scale(.90);
  }

  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter-active {
    transition: all 1s ease;
  }

  .fade-leave-active {
    position: absolute;
  }


  .fade-leave-from {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
  }

  .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  .switch-enter-to,
  .switch-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .switch-enter-active {
    transition: all .2s ease;
  }

  .switch-leave-active {
    transition: all .2s ease;
  }

</style>
