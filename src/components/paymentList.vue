<template>
  <div class="paymentList">
    <!-- название колонок -->
    <div class="columnName">
      <div class="index">#</div>
      <div class="date">Date</div>
      <div class="category">Category</div>
      <div class="value">Value</div>
    </div>
    <!-- контент -->
    <div class="columnContent" v-for="item in getData" :key="item.index">
      <div class="index">{{ item.index }}</div>
      <div class="date">{{ item.date }}</div>
      <div class="category">{{ item.category }}</div>
      <div class="value">{{ item.value }}</div>
      <div class="params">
        <div @click="openParams(item.index)" class="paramsIcon">
          <i class="fas fa-ellipsis-v"></i>
        </div>
        <!-- анимация на кнопки -->
        <transition
          enter-active-class="animate__animated animate__flipInX"
          leave-active-class="animate__animated animate__flipOutX"
          mode="out-in"
        >
          <!-- добавил кнопки удаления и редактирования -->
          <div v-if="item.index == paramsNumber" class="paramsMenu">
            <button @click="editParams(item)">
              <i class="fas fa-pen"></i> Редактировать
            </button>
            <button @click="deletedParams(item.index)">
              <i class="far fa-trash-alt"></i> Удалить
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "paymentList",
  data() {
    return {
      paramsNumber: 0,
    };
  },
  methods: {
    ...mapMutations(["deleteCost"]),
    // получаем index открываемого элемента
    openParams(value) {
      this.paramsNumber = value;
    },
    // метод удаляет из списка выбранный элемент из стора
    deletedParams(value) {
      // удаляем через плагин элемент
      this.$context.deleteElement(value);
      // что бы окно закрылось
      this.paramsNumber = 0;
    },
    editParams(item) {
      // отправляем нужного модального окна в плагин
      this.$context.openModal("editCosts");
      // отправляем данные об обьекте в плагин
      this.$context.editData(item);
      this.paramsNumber = 0;
    },
  },
  computed: {
    // получаем данные из store для отрисовки списка
    ...mapGetters(["dataPaymentList"]),

    getData() {
      return this.dataPaymentList;
    },
  },
};
</script>

<style lang="scss" scoped>
.paymentList {
  margin-top: 20px;
  width: 490px;
}
.params {
  padding: 10px;
  text-align: center;
}
.paramsIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 15px;
}

.columnName {
  display: flex;
  font-weight: 900;
  border-bottom: 1px solid #e2e2e2;
  height: 30px;
  width: 398;
}
.columnContent {
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  div {
    height: 45px;
    display: flex;
    align-items: center;
  }
}
.paramsMenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start !important;
  margin-top: 120px;
  margin-left: -85px;
  background-color: white;
  width: 140px;
  height: 70px !important;
  box-shadow: 0 0 21px rgb(0 0 0 / 35%);
  button {
    border: 0px;
    width: 100%;
    text-align: left;
    height: 35px;
    background-color: white;
    i {
      color: rgba(158, 158, 158, 0.986);
      font-size: 12px;
      margin-right: 10px;
    }
  }
  button:hover {
    text-decoration: underline;
    background-color: #eee;
  }
}
.paramsMenu::before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  right: 35px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.index {
  width: 50px;
}
.date {
  width: 100px;
}
.category {
  width: 200px;
}
.value {
  width: 100px;
}
</style>
