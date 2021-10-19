<template>
  <v-container>
    <header>
      <div class="text-h5 text-sm-h3 mb-8">My personal costs</div>
    </header>
    <v-row>
      <v-col>
        <main>
          <v-dialog v-model="dialog" max-width="400px" :persistent="true">
            <template v-slot:activator="{ on }">
              <v-btn
                :ripple="false"
                v-on="on"
                color="teal"
                dark
                @click="openModal"
                class="mb-4 font-weight-lighter"
                >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
              ></template
            >
            <v-card>
              <AddingCosts @closeModal="closeModal"></AddingCosts>
            </v-card>
          </v-dialog>

          <PaymentList />
          <Paginate class="mt-4" /></main
      ></v-col>
      <v-col class="mt-14"> <Chart></Chart></v-col
    ></v-row>
  </v-container>
</template>

<script>
import PaymentList from "../components/paymentList.vue";
import Paginate from "../components/paginate.vue";
import AddingCosts from "../components/modalWindow/addingCosts.vue";
import { mapActions } from "vuex";
import Chart from "../components/chartComp.vue";

export default {
  name: "dashboard",
  components: {
    PaymentList,
    Paginate,
    AddingCosts,
    Chart,
  },
  data() {
    return {
      page: "",
      modalName: "",
      dialog: false,
    };
  },
  methods: {
    // метод загружающий данные с гита в store
    ...mapActions(["fetchData"]),
    closeModal(value) {
      this.dialog = value;
    },
    openModal() {
      this.$router.push({ path: "/dashboard/add/payment/" }).catch(() => {}); // для выключения NavigationDublicate
    },
    routing() {
      if (this.$route.matched[0].path === "/dashboard/add/payment*") {
        this.dialog = true;
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

<style lang="scss">
</style>