<template>
  <div class="modal">
    <div class="modal-guts form">
      <span> Добавление нового расхода:</span>
      <input type="date" placeholder="Date" v-model="date" />
      <select size="1" v-model="category">
        <option value="" default disabled selected>Select your category</option>
        <option v-for="item in getCategory" :key="item">
          {{ item }}
        </option>
      </select>
      <input type="number" min="0" placeholder="Value" v-model="value" />

      <div class="error" v-if="errorBefor">{{ error }}</div>
    </div>
    <div class="buttonForm">
      <button class="close-button" @click="validation">ADD +</button>
      <button class="close-button" @click="pageRendering">Close</button>
    </div>
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
    error: "Заполните все данные корректно",
    errorBefor: false,
  }),
  methods: {
    ...mapMutations(["createCost"]),
    // валидация формы
    validation() {
      if (this.category == "" || this.value == "" || this.date == "") {
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
        index: this.getData[this.getData.length - 1].index + 1, // что бы индексы все были уникальными
        date: this.date,
        category: this.category,
        value: this.value,
      });
    },
    // метод меняет состояние отправки форм до начального
    pageRendering() {
      // обнуляем  данные форм
      this.category = "";
      this.value = "";
      // убираем ошибку
      this.errorBefor = false;
      this.closeModal();
    },
    // метод добавляет текущую дату в значение инпута
    dateComp() {
      let date = new Date();
      let d = ("0" + date.getDate()).slice(-2);
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let y = date.getFullYear();
      this.date = `${y}-${m}-${d}`;
    },

    // метод меняет роутинг и скрывает модальное окно
    closeModal() {
      this.$router.push({ name: "dashboard" });
      this.$modal.hide("");
    },
    updateCompData() {
      // автозаполнение формы из url
      this.category = this.$route.query.category ?? "Food";
      this.value = this.$route.query.value ?? 100;
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
    // читаем данные из строки запроса
    this.updateCompData();
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
  beforeDestroy() {
    // перед уничтожением меняет роут
    this.$router.push("/").catch(() => {}); // для выключения NavigationDublicate
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  left: 38%;
  top: 30%;
  margin: auto;
  width: 400px;
  padding: 30px;
  height: 350px;
  border: 1px solid #000;
  background: white;
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
.buttonForm {
  display: flex;
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
  span {
    font-size: 28px;
    margin-bottom: 20px;
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
</style>
