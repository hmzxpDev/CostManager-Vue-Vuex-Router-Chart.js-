<template>
  <div class="paymentList">
    <div class="columnName">
      <div class="index">#</div>
      <div class="date">Date</div>
      <div class="category">Category</div>
      <div class="value">Value</div>
    </div>
    <div class="columnContent" v-for="item in list" :key="item.index">
      <div class="index">{{ item.index }}</div>
      <div class="date">{{ item.date }}</div>
      <div class="category">{{ item.category }}</div>
      <div class="value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "paymentList",
  props: ["list"],
};
</script>

<style lang="scss" scoped>
.paymentList {
  margin-top: 20px;
}
.columnName {
  display: flex;
  font-weight: 900;
  border-bottom: 1px solid #f3f3f3;
  height: 30px;
}
.columnContent {
  display: flex;
  border-bottom: 1px solid #f3f3f3;
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
