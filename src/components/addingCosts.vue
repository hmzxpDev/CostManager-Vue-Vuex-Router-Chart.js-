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
      <input type="text" placeholder="Category" v-model="category" />
      <input type="number" min="0" placeholder="Value" v-model="value" />
      <div buttonForm>
        <button @click="sendForm">ADD +</button>
        <button @click="closeButton">Close</button>
      </div>

      <div class="error" v-if="errorBefor">{{ error }}</div>
    </div>
  </div>
</template>

<script>
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
    sendForm() {
      // простая валидация на пустые формы
      if (this.category == "" || this.value == "") {
        this.errorBefor = true;
      } else {
        // передаем данные в родителя
        this.$emit("formSend", {
          date: this.date,
          category: this.category,
          value: this.value,
        });
        // закрываем формы, открываем кнопку открытия форм
        this.closeButton();
        // обнуляем  данные форм
        this.category = "";
        this.value = "";
        // убираем ошибку
        this.errorBefor = false;
      }
    },
    // делаем дату если пользователь решил не выбирать ничего
    dateComp() {
      let date = new Date();
      let d = ("0" + date.getDate()).slice(-2);
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let y = date.getFullYear();
      this.date = `${y}-${m}-${d}`;
    },
    closeButton() {
      // закрываем формы, открываем кнопку открытия форм
      this.form = !this.form;
      this.addNewCost = !this.addNewCost;
    },
  },
  // для того что бы всегда иметь актуальную дату
  created() {
    this.dateComp();
  },
};
</script>

<style lang="scss" scoped>
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
  input {
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
