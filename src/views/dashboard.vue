<template>
  <div class="leftSide">
    <header>
      <span class="Headding">My personal cost</span>
    </header>
    <main>
      <addingCosts />
      <paymentList />
      <paginate />
    </main>
  </div>
</template>

<script>
import paymentList from "../components/paymentList.vue";
import addingCosts from "../components/addingCosts.vue";
import paginate from "../components/paginate.vue";
import { mapActions } from "vuex";

export default {
  name: "dashboard",
  components: {
    paymentList,
    addingCosts,
    paginate,
  },
  data() {
    return {
      page: "",
    };
  },
  methods: {
    // метод загружающий данные с гита в store
    ...mapActions(["fetchData"]),
  },
  async created() {
    this.fetchData();
  },
  mounted() {
    window.document.title = "Dashboard";
  },
};
</script>

<style>
</style>