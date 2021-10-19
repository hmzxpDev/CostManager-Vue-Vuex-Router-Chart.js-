<template>
  <v-pagination
    v-model="page"
    :length="getFullArr"
    total-visible="8"
    class="pagination"
    :circle="true"
  ></v-pagination>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "paginate",
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    ...mapMutations(["listUpdate"]),
    urlUpdate() {
      this.$router
        .push({
          path: "/dashboard/paginate/",
          query: { id: `${this.page}` },
        })
        .catch(() => {}); // для выключения NavigationDublicate
    },
    urlParsingData() {
      if (isNaN(+this.$route.query.id)) {
        this.page = 1;
      } else {
        this.page = +this.$route.query.id ?? 1;
      }
    },
  },
  computed: {
    ...mapGetters(["paginationLenght"]),
    getFullArr() {
      return this.paginationLenght;
    },
  },
  created() {
    this.urlParsingData();
  },
  updated() {
    this.urlUpdate();
    this.listUpdate(this.page);
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  border: 1px solid #f1f1f1;
  height: 65px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
::v-deep button {
  box-shadow: none !important;
  background-color: none;
  outline: none !important;
}
::v-deep .v-pagination__item--active {
  background-color: white !important;
  color: rgb(80, 146, 146) !important;
}
</style>