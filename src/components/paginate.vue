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
      // нужно для реактивности пагинации и работы кнопок + реактивности
      list: 1,
    };
  },
  methods: {
    ...mapMutations(["paginateComp"]),
    // получаемое значение нажатой кнопки отправляем в store, который потом пришлет актуальный список страниц и кнопок пагинации
    chooseList(value) {
      this.list = value;
      this.paginateComp(value);
      this.UrlUpdate();
    },
    // предедущая страница
    prevList() {
      if (this.list > 1) {
        this.paginateComp(--this.list);
        // меняем url значение
        this.UrlUpdate();
      }
    },
    // следующая страница
    nextList() {
      if (this.list <= this.getFullArr - 1) {
        this.paginateComp(++this.list);
        // меняем url значение
        this.UrlUpdate();
      }
    },
    // метод при нажатии на кнопки пагинации - добавляет динамические параметры в url
    UrlUpdate() {
      this.$router
        .push({
          path: "/dashboard/paginate/",
          query: { id: `${this.list}` },
        })
        .catch(() => {}); // для выключения NavigationDublicate
    },
    // метод, который считывает динамические данные из url и выводит нужную страницу пагинации
    urlParsing() {
      // если данных нет - тогда переводит на 1 страницу
      let page = this.$route.query.id ?? 1;
      // для передачи номера актуальной страницы в store
      this.paginateComp(page);
      // для обновления цифры на панеле
      this.list = Number(page);
    },
  },
  computed: {
    ...mapGetters(["arrayPaginate", "compListNumber"]),
    // получаем актуальное количество страниц для пагинации
    getFullArr() {
      return this.compListNumber;
    },
    // получаем массив кнопок из стора для отрисовки
    getPaginationList() {
      // если активная страница меньше трех - показывает справа 4 кнопки
      if (this.list < 3) {
        return this.arrayPaginate.slice(0, 5);
      }
      // если больше 3 - то показывает слева и справа по 3 элемента массива
      else {
        return this.arrayPaginate.slice(this.list - 3, this.list + 2);
      }
    },
  },
  created() {
    this.urlParsing();
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