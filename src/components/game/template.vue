<template>
  <div class="game animate__animated animate__bounceInRight" id="game">
    <div class="options" id="options">
      <div class="steps" id="steps">
        Количество ходов: <span id="steps__val"> 0</span>
    </div>
    <div class="timer" id="timer" v-if="timerOn">
    <p>Время: </p>  <p id="min">0</p>  :  <p id="sec">00</p>
    </div>
    </div>
    <div class="field" id="field">
      <div class="card open"
        v-for="item in cards"
        :key="item.id"
        :data-id="item.id">
      <img class="card__front" :src=item.url>
      <div class="card__back"></div>
      </div>
    </div> 
    <button class="button" @click="playAgain">Играть заново</button>       
  </div>
</template>

<script src="./index.js"></script>
<style scoped>
    @import "./style.css"
</style>