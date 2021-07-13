<template>
  <div class="pagination">
    <div class="buttonBox">
      <button @click="prevList"><i class="fas fa-angle-left"></i></button>
      <button
        :class="{ current: list === item }"
        type="button"
        @click="chooseList(item)"
        v-for="item in getPaginationList"
        :key="item"
      >
        {{ item }}
      </button>
      <button @click="nextList"><i class="fas fa-angle-right"></i></button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "paginate",
  data() {
    return {
      // нужно для реактивности пагинации и работы кнопок
      list: 1,
    };
  },
  methods: {
    ...mapMutations(["paginateComp"]),
    // получаемое значение нажатой кнопки отправляем в store, который потом пришлет актуальный список страниц и кнопок пагинации
    chooseList(value) {
      this.list = value;
      this.paginateComp(value);
    },
    // предедущая страница
    prevList() {
      if (this.list > 1) {
        this.paginateComp(--this.list);
      }
    },
    // следующая страница
    nextList() {
      if (this.list <= this.getFullArr - 1) {
        this.paginateComp(++this.list);
      }
    },
  },
  computed: {
    ...mapGetters(["arrayPaginate", "compListNumber"]),
    // количество листов пагинации, только для работы кнопки
    getFullArr() {
      return this.compListNumber;
    },

    // метод получения массива для отрисовки кнопок пагинации
    getPaginationList() {
      if (this.list < 3) {
        // если активная страница меньше трех - то просто отбражает первые 5 кнопок
        return this.arrayPaginate.slice(0, 5);
        // если больше 3 - то покажет 6 ближайших кнопок
      } else {
        return this.arrayPaginate.slice(this.list - 3, this.list + 2);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@fortawesome/fontawesome-free/css/all.min.css";
.pagination {
  margin-top: -1px;
  border: 1px solid #e2e2e2;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.current {
  color: rgb(0, 153, 255);
}
.buttonBox {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    background: none;
    border: 0px;
    font-weight: 900;
    font-size: 16px;
  }
  button:active {
    color: rgb(0, 153, 255);
  }
}
</style>