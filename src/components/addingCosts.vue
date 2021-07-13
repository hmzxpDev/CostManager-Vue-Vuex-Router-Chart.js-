<template>
  <div>
    <button
      v-show="addNewCost"
      @click="
        form = !form;
        addNewCost = !addNewCost;
      "
    >
      ADD NEW COST +
    </button>
    <div v-show="form" class="form">
      <input type="date" placeholder="Date" v-model="date" />
      <select size="1" v-model="category">
        <option value="" default disabled selected>Select your category</option>
        <option v-for="item in getCategory" :key="item">{{ item }}</option>
      </select>
      <input type="number" min="0" placeholder="Value" v-model="value" />
      <div buttonForm>
        <button @click="validation">ADD +</button>
        <button @click="pageRendering">Close</button>
      </div>

      <div class="error" v-if="errorBefor">{{ error }}</div>
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
      // передаем данные в store
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
  },
  computed: {
    ...mapGetters(["dataGetter", "categoryGetter"]),
    // для добавления актуального индекса
    getData() {
      return this.dataGetter;
    },
    getCategory() {
      return this.categoryGetter;
    },
  },
  created() {
    // для того что бы всегда иметь актуальную дату
    this.dateComp();
  },
};
</script>

<style lang="scss" scoped>
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
