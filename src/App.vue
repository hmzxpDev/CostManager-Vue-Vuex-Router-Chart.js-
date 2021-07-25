<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>




<style lang="css">
/* кнопка анимация */
button {
}

button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* логичнее всего сделать обнуление стилей в родителе */

* {
  text-decoration: none;
}
/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
  max-width: 100%;
  display: block;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

.Headding {
  font-size: 40px;
  font-weight: 700;
}
.leftSide {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
}
</style>
