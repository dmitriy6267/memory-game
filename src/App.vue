<template>
  <div id="app">
    <h1>НАЙДИ ПАРУ</h1>
    <Menu v-if="!showGame"
          :startGame="startGame"/>
    <Game v-if="showGame"
          :width="width"
          :height="height"
          :quantity="quantity"
          :timerOn="timerOn"
          :timeMode="timeMode"
          :playAgain="playAgain"
          :changePage="changePage"/>
          
  </div>
</template>

<script>
import Game from './components/game/template.vue'
import Menu from './components/menu/template.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Game
  },
  methods: {
    changePage() {
      this.showGame = !this.showGame
    },
    checkMode() {
      if (document.getElementById('time').checked) {
        this.timeMode = true
        this.timerOn = true
      }
    },
    startGame() {
      if(this.checkFields()) {
        this.checkMode()
        document.getElementById('menu').classList.add('animate__animated', 'animate__bounceOutLeft')
        setTimeout(() => {
          this.changePage()
        }, 500)
        
      }      
    },
    error(el) {
      document.getElementById(el).classList.add('error')
      setTimeout(() => {
            document.getElementById(el).classList.remove('error')
          }, 1000)
    },
    checkFields() {
      let x = document.getElementById('width').value
      let y = document.getElementById('height').value
      let val = document.getElementById('quantity').value

      let checkSize = false
      let checkNum = false
      let checkRange = false

      if (!(isFinite(x) && x !== '')) {
          this.error('width')
          return false
        }
      if (!(isFinite(y) && y !== '')) {
        this.error('height')
        return false
      }
      if (!(isFinite(val) && val !== '')) {
        this.error('quantity')
        return false
      }
      if ((isFinite(x) && x !== '') && (isFinite(y) && y !== '') && (isFinite(val) && val !== '')) {
        this.width = +x
        this.height = +y
        this.quantity = +val
        checkNum = true
      }

      if (x%2 === 0 || y%2 === 0) {
        checkSize = true
      } else {
        this.error('width')
        this.error('height')
        return false
      }

      if ((+x > 1 && +x <= 10) && (+y > 1 && +y <= 10) && (+val > 4 && +val <= 10)) {
        checkRange = true
      } else {
        this.error('quantity')
        return false
      }

      if (checkSize && checkNum && checkRange) {
        return true        
      } else {
        return false
      }
     }
  },
  data: () => {
    return {
      quantity: '',
      timeMode: false,
      fieldSize: {
        height: 0,
        width: 0
      },
      showGame: false,
      timerOn: false,   
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 100px;
  font-family: 'Neucha', cursive;
  white-space: pre;
}
h1 {
  font-size: 60px;
  text-align: center;
}
</style>
