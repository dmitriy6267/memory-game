
export default {
  name: 'game',
  props: {
    width: Number,
    height: Number,
    quantity: Number,
    showGame: Boolean,
    timerOn: Boolean,
    timeMode: Boolean,
    changePage: Function
  },
  data: () => {
    return {
      cards: [...Array(11).keys()].map((key, i) => ({
        url: require(`@/assets/${key}.svg`),
        id: i
      })),
      min: 0,
      sec: 0,
      t: null,
      isOpen: false,
      lockField: false,
      firstCard: null,
      secondCard: null,
      steps: 0,
      count: 0
    }
  },
  methods: {
    playAgain() {
      this.stopTimer()
      document.getElementById('game').classList.add('animate__animated', 'animate__bounceOutRight')
      setTimeout(() => {
        this.changePage()
      }, 500)
    },
    createArray() {
      let arr = []
      this.cards.sort(() => Math.random() - 0.5)
      for (let i=0; i < this.quantity; i++) {
        arr.push(this.cards[i])
        arr.push(this.cards[i])
      }
      const a = arr.slice(0)
      const b = arr.concat(a)
      const c = b.slice(0)
      const d = c.concat(b)

      const images = d.concat(arr)
      return images
    },
    timer() {
      document.getElementById('min').innerHTML = `${this.min}`
      document.getElementById('sec').innerHTML = `0${this.sec}`
      if (this.sec > 9) {
        document.getElementById('sec').innerHTML = `${this.sec}`
      }
      this.sec++
      if (this.sec === 60) {
        this.min++
        this.sec = 0
      }
    },
    startTimer() {
      this.t = setInterval(this.timer, 1000)
    },
    stopTimer() {
      clearInterval(this.t)
    },
    showCard(e) {
      let obj = e.currentTarget
      if (this.lockField) return
      if (obj === this.firstCard) return

      obj.classList.add('open')

      if (!this.isOpen) {
        this.isOpen = true
        this.firstCard = e.currentTarget
        return
      }

      this.secondCard = obj
      this.lockField = true
        this.steps++
        document.getElementById('steps__val').innerHTML = this.steps
      this.checkCards()
    },
    checkCards() {
      if (this.firstCard.dataset.id === this.secondCard.dataset.id) {
        this.holdCards()
      }  else {
        this.closeCards()
      } 
    },
    holdCards() {
      this.firstCard.removeEventListener('click', this.showCard)
      this.secondCard.removeEventListener('click', this.showCard)

      this.resetField()
      this.count++
      if (this.count === ((this.width*this.height)/2)) {
        this.stopTimer()
        document.getElementById('field').classList.add('animate__animated', 'animate__tada')
        document.getElementById('steps').classList.add('rotate')
        document.getElementById('timer').classList.add('rotate')
      }
    },
    closeCards() {
      setTimeout(() => {
        this.firstCard.classList.remove('open')
        this.secondCard.classList.remove('open')
        this.resetField()
      }, 1000)
    },
    resetField() {
      this.isOpen = false
      this.lockField = false
      this.firstCard = null
      this.secondCard = null
    }
  },
  created: function() {
    this.cards = this.createArray().slice(0, this.width*this.height).sort(() => Math.random() - 0.5)
  },
  mounted: function() {   
    document.getElementById('game').style.width = `${102*this.width}px`
    document.getElementById('options').style.width = `${102*this.width}px`
      const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {card.addEventListener('click', this.showCard)})
    if (this.tieMode) {
      document.getElementById('timer').style.display = 'flex'
    }
    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove('open')
      })
    }, 1700)
    if (this.timeMode) {
      this.startTimer()
    }
  
    if (this.height > 6) {
      document.querySelectorAll('.card').forEach((card) => {
        card.style.width = `64px`
        card.style.height = `64px`
      })
      document.getElementById('field').style.width = `${72*this.width}px`
    }
  }
}