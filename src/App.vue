<template>
  <div id="app">
    <div class="leftSide">
      <span class="Headding">My personal cost</span>
      <addingCosts @formSend="pushEL" />
      <paymentList :list="data" />
      <paginate
        :page-count="2"
        :click-handler="test"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'className'"
      >
      </paginate>
    </div>
  </div>
</template>

<script>
import paymentList from "./components/paymentList.vue";
import addingCosts from "./components/addingCosts.vue";
import paginate from "vuejs-paginate";

export default {
  name: "App",
  components: {
    paymentList,
    addingCosts,
    paginate,
  },
  data: () => ({
    data: 0,
  }),
  methods: {
    // залил на свой репозиторий, что бы не засорять данными код
    fetchData() {
      fetch("https://raw.githubusercontent.com/hmzxpDev/API/main/item.json")
        .then((res) => res.json())
        .then((item) => {
          this.data = item;
        });
    },
    pushEL(el) {
      // полученное значение дополняем индексом. что бы лишний раз не передавать data в дочку
      el.index = this.data.length + 1;
      // добавляем в дату
      this.data.push(el);
    },
    test() {
      console.log(123);
    },
  },
  created() {
    // фетчим дату
    this.fetchData();
  },
};
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
