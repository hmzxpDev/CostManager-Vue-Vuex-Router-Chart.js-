<template>
  <div id="app">
    <div class="leftSide">
      <span class="Headding">My personal cost</span>
      <addingCosts />
      <paymentList />
      <paginate />
    </div>
  </div>
</template>

<script>
import paymentList from "./components/paymentList.vue";
import addingCosts from "./components/addingCosts.vue";
import paginate from "./components/paginate.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    paymentList,
    addingCosts,
    paginate,
  },
  methods: {
    // метод загружающий данные с гита в store
    ...mapActions(["fetchData"]),
  },
  async created() {
    this.fetchData();
  },
};

// ДОДЕЛАТЬ ИЗ СТОРА ОТРИСОВКУ ВСЕХ СЕЛЕКТОВ ЗАВТРА
</script>




<style lang="css">
/* логичнее всего сделать обнуление стилей в родителе */

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
  width: 450px;
}
</style>
