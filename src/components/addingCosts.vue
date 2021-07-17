<template>
  <div class="AddCosts">
    <!-- кнопка открывает добавление оплаты и меняет url-->
    <router-link to="/dashboard/add/payment/">
      <!-- трестирую анимацию -->
      <transition
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceOutRight"
        mode="out-in"
        ><button
          v-show="addNewCost"
          @click="
            form = !form;
            addNewCost = !addNewCost;
          "
        >
          ADD NEW COST +
        </button>
      </transition>
      <transition
        enter-active-class="animate__animated animate__bounceInLeft"
        leave-active-class="animate__animated animate__bounceOutRight"
        mode="out-in"
      >
        <!-- открывается после нажатия верхней кнопки -->
        <div v-show="form" class="form">
          <!-- время указывается автоматически сегодня -->
          <input type="date" placeholder="Date" v-model="date" />
          <!-- выбор категорий затрат -->
          <select size="1" v-model="category">
            <option value="" default disabled selected>
              Select your category
            </option>
            <option v-for="item in getCategory" :key="item">{{ item }}</option>
          </select>
          <!-- потраченные средства -->
          <input type="number" min="0" placeholder="Value" v-model="value" />
          <!-- кнопки которые отправляют форму и закрывают ее -->
          <div class="buttonForm">
            <router-link to="/">
              <button @click="validation">ADD +</button></router-link
            >
            <router-link to="/"
              ><button @click="pageRendering">Close</button></router-link
            >
          </div>
          <!-- ошибка, которая появляется при неправильном заполнения форм -->
          <div class="error" v-if="errorBefor">{{ error }}</div>
        </div>
      </transition>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "addingCosts",
  data: () => ({
    date: "",
    category: "",
    value: "",
    form: false,
    addNewCost: true,
    error: "Заполните все данные корректно",
    errorBefor: false,
  }),
  methods: {
    ...mapMutations(["createCost"]),
    // валидация формы
    validation() {
      if (this.category == "" || this.value == "") {
        this.errorBefor = true;
      } else {
        //отправляем данные формы в store
        this.sendToStore();
        //очищаем инпуты, меняем кнопки
        this.pageRendering();
      }
    },
    sendToStore() {
      // передаем данные затраты в store
      this.createCost({
        index: this.getData.length + 1,
        date: this.date,
        category: this.category,
        value: this.value,
      });
    },
    // метод меняет состояние отправки форм до начального
    pageRendering() {
      // закрываем формы, открываем кнопку открытия форм
      this.form = !this.form;
      this.addNewCost = !this.addNewCost;
      // обнуляем  данные форм
      this.category = "";
      this.value = "";
      // убираем ошибку
      this.errorBefor = false;
    },
    // метод добавляет текущую дату в значение инпута
    dateComp() {
      let date = new Date();
      let d = ("0" + date.getDate()).slice(-2);
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let y = date.getFullYear();
      this.date = `${y}-${m}-${d}`;
    },
    // метод открывает и закрывает форму в зависимости от наличия динамических данных в url
    formState() {
      if (this.$route.matched[0].path === "/dashboard/add/payment*") {
        // открываем формы
        this.form = true;
        this.addNewCost = false;
        // вставляет динамические значения из url в формы
        this.category = this.$route.query.category ?? "Food"; // если данных нет - то автоматически food
        this.value = this.$route.query.value ?? 100; // если данных нет - то автоматически 0
      }
    },
  },
  computed: {
    ...mapGetters(["dataGetter", "categoryGetter"]),
    // для добавления актуального индекса
    getData() {
      return this.dataGetter;
    },
    // получаем массив категрой затрат
    getCategory() {
      return this.categoryGetter;
    },
  },
  created() {
    // для того что бы всегда иметь актуальную дату
    this.dateComp();
    // открывает форму если в url есть динамические данные
    this.formState();
  },
  updated() {
    // во время обновления в форме данных - будет добавлять их в url
    this.$router
      .push({
        path: "/dashboard/add/payment/",
        query: { category: `${this.category}`, value: this.value },
      })
      .catch(() => {}); // для выключения NavigationDublicate
  },
};
</script>

<style lang="scss" scoped>
.AddCosts {
  height: 165px;
}
.AddCosts a {
  display: flex;
}
.animate__bounceInLeft {
  animation-delay: 1s;
}
.animate__flipInX {
  animation-delay: 1s;
}

option[default] {
  display: none;
}
button {
  margin-top: 20px;
  margin-right: 30px;
  width: 150px;
  height: 30px;
  font-size: 12px;
  background: #25a79a;
  border: 0px;
  color: white;
}
.form {
  display: flex;
  flex-direction: column;
  input,
  select {
    margin-top: 10px;
    height: 30px;
    width: 200px;
    border: 1px solid rgb(194, 194, 194);
  }
  div {
    display: flex;
  }
}
.error {
  color: red;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
}
.buttonForm {
  display: flex;
}
</style>
