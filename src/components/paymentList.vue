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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "paymentList",
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
}
.columnName {
  display: flex;
  font-weight: 900;
  border-bottom: 1px solid #e2e2e2;
  height: 30px;
}
.columnContent {
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  div {
    height: 40px;
    display: flex;
    align-items: center;
  }
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
