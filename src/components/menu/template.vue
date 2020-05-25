<template>
    <div class="menu animate__animated animate__bounceInLeft" id="menu">
      
        <h2 class="rules">Условия игры</h2>
        <div class="rules__text">Задайте размер игрового поля и количество различных картинок на поле.<br>Вводить можно только числа. Одна из сторон поля должна быть четной.<br>Оставлять поля пустыми нельзя.
        </div>
        <div class="size">
          <h3>Ширина (2 - 10)</h3>
          <input type="text" class="input" placeholder="Введите ширину" id="width" autofocus>
          <h3>Высота (2 - 10)</h3>
          <input type="text" class="input" placeholder="Введите высоту" id=height>
        </div>
        <div class="quantity">
          <h3 class="quantity__header">Количество карточек (5-10)</h3>
          <input type="text" class="input" placeholder="Количество карточек" id="quantity">
        </div>
        <p><input type="checkbox" class="checkbox" name="mode" id="time"><label for="time" style="cursor:pointer;">Игра на время</label></p>
        <button class="button" @click="startGame">Играть</button>
      
    </div>
</template>

<script src="./index.js"></script>
<style scoped>
  @import "./style.css"
</style>