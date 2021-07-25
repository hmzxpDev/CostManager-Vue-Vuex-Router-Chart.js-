<template>
  <div class="leftSide">
    <header>
      <span class="Headding">My personal cost</span>
    </header>
    <main>
      <button @click="openModal" class="open-button">ADD NEW COST +</button>
      <paymentList />
      <paginate />
      <modalWindow />
    </main>
  </div>
</template>

<script>
import paymentList from "../components/paymentList.vue";
import paginate from "../components/paginate.vue";
import { mapActions } from "vuex";
import modalWindow from "../components/ModalWindow.vue";

export default {
  name: "dashboard",
  components: {
    paymentList,
    paginate,
    modalWindow,
  },
  data() {
    return {
      page: "",
      modalName: "",
    };
  },
  methods: {
    // метод загружающий данные с гита в store
    ...mapActions(["fetchData"]),
    // открывает модальное окно добавления расходов
    openModal() {
      this.$router.push({ path: "/dashboard/add/payment/" }).catch(() => {}); // для выключения NavigationDublicate
      this.$modal.show("addingCosts");
    },
    // обновляю настройки роутинга
    routing() {
      if (this.$route.matched[0].path === "/dashboard/add/payment*") {
        this.$modal.show("addingCosts");
      }
    },
  },
  async created() {
    this.fetchData();
  },
  mounted() {
    window.document.title = "Dashboard";
    // проверка на url
    this.routing();
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
</style>