<template>
  <div class="editBody">
    <div class="editInputs">
      <span>Редактирование расхода :</span>
      Дата<input
        type="date"
        placeholder="Date"
        v-model="date"
        v-bind:class="{ erorInput: dateError }"
      />
      Категория<select
        size="1"
        v-model="category"
        v-bind:class="{ erorInput: categoryError }"
      >
        <option v-for="item in getCategory" :key="item">
          {{ item }}
        </option></select
      >Значение<input
        type="number"
        min="0"
        placeholder="Value"
        v-model="value"
        v-bind:class="{ erorInput: valueError }"
      />
    </div>
    <div class="editButtons">
      <button @click="validationInput">Update</button>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
// понадобиться для загрузки категорий и отправки в store данных
import { mapGetters, mapMutations } from "vuex";
export default {
  // получаем данные из modalWindow
  props: ["settings"],
  name: "editCosts",
  data() {
    return {
      // данные для реактивности
      date: "",
      category: "",
      value: "",
      // данные для ошибки
      dateError: false,
      categoryError: false,
      valueError: false,
    };
  },
  methods: {
    //   берем из стора мутацию на обновление данных
    ...mapMutations(["updateData"]),
    // метод проверяет заполненность инпутов, если нет то разукрашивает красным
    validationInput() {
      if (this.date == "") {
        this.dateError = true;
        return;
      } else {
        this.dateError = false;
      }
      if (this.value == "") {
        this.valueError = true;
        return;
      } else {
        this.valueError = false;
      }
      if (this.category == "") {
        this.categoryError = true;
        return;
      } else {
        this.categoryError = false;
      }
      //   если валидация прошла успешно
      this.sendDataToStore();
    },
    // метод отправляет данные в store
    sendDataToStore() {
      let object = {
        index: this.settings.index,
        date: this.date,
        value: this.value,
        category: this.category,
      };
      this.updateData(object);
      //   закрываем модальное окно через шину событий
      this.$modal.hide();
    },
    // метод получает данные из родителя и записывает их в свои данные
    updateCompData() {
      this.date = this.settings.date;
      this.value = this.settings.value;
      this.category = this.settings.category;
    },
    // кнопка закрытия модального окна
    closeModal() {
      this.$modal.hide();
    },
  },
  computed: {
    ...mapGetters(["categoryGetter"]),
    // получаем массив категрой затрат для отрисовки
    getCategory() {
      return this.categoryGetter;
    },
  },
  // обновляем данные при загрузке модального окна
  created() {
    this.updateCompData();
  },
};
</script>

<style lang="scss" scoped>
.erorInput {
  border: 1px solid red;
}
.editBody {
  display: flex;
  padding: 15px;
  width: 600px;
  height: 225px;
  background-color: white;
  position: absolute;
  margin-top: -100px;
  margin-left: -400px;
  left: 50%;
  top: 50%;
  span {
    font-size: 30px;
    font-weight: 700;
  }
}
.editInputs {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  width: 355px;
  font-size: 20px;
}
.editButtons {
  height: 100%;
  width: 208px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  button {
    margin-top: 5px;
    width: 150px;
    height: 30px;
    font-size: 12px;
    background: #25a79a;
    border: 0px;
    color: white;
  }
}
</style>