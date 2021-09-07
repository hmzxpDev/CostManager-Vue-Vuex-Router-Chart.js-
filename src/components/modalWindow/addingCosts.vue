<template>
  <div class="modal d-flex flex-column pa-4">
    <span class="font-weight-bold"> Add new cost:</span>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
      <v-select
        v-model="category"
        :items="getCategory"
        label="Category"
        required
      ></v-select>
      <v-text-field
        v-model="value"
        label="Value"
        :rules="rulesValue"
        required
      ></v-text-field>

      <v-row>
        <v-col :cols="8"
          ><v-btn
            @click="sendToStore"
            :ripple="false"
            color="teal"
            :disabled="!valid"
            class="buttonAdd font-weight-lighter"
            >ADD <v-icon>mdi-plus</v-icon></v-btn
          ></v-col
        >
        <v-col :cols="3"
          ><v-btn
            @click="closeModalWindow"
            :ripple="false"
            color="red"
            dark
            class="font-weight-lighter"
            >Close</v-btn
          ></v-col
        >
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "addingCosts",
  props: ["displayModal"],
  data: () => ({
    modal: false,
    lazy: false,
    valid: false,
    date: "",
    category: "",
    value: "",
    rulesValue: [
      (value) => {
        return (
          (!isNaN(+value) &&
            !(value < 0) &&
            !(value == "") &&
            !(value >= 1000000000)) ||
          "Enter a positive number less than 1,000,000,000"
        );
      },
    ],
  }),
  methods: {
    ...mapMutations(["createCost"]),
    closeModalWindow() {
      this.$emit("closeModal", false);
      // this.backToDefaultData();
      this.urlUpdate();
    },
    sendToStore() {
      this.createCost({
        index: this.getData[this.getData.length - 1].index + 1, // что бы индексы все были уникальными
        date: this.date,
        category: this.category,
        value: +this.value,
      });
      this.closeModalWindow();
    },
    newDate() {
      let date = new Date();
      let d = ("0" + date.getDate()).slice(-2);
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let y = date.getFullYear();
      this.date = `${y}-${m}-${d}`;
    },
    urlUpdate() {
      this.$router.push({ name: "dashboard" });
    },
    parseDynamicData() {
      this.category = this.$route.query.category ?? "Food";
      this.value = this.$route.query.value ?? 100;
    },
  },
  computed: {
    ...mapGetters(["dataGetter", "categoryGetter"]),
    // для добавления актуального индекса
    getData() {
      return this.dataGetter;
    },
    getCategory() {
      return this.categoryGetter;
    },
  },
  created() {
    this.newDate();
    this.parseDynamicData();
  },
  beforeUpdate() {
    this.$router
      .push({
        path: "/dashboard/add/payment/",
        query: { category: `${this.category}`, value: this.value },
      })
      .catch(() => {}); // для выключения NavigationDublicate
  },
};
</script>

<style lang="scss" scoped>
::v-deep .buttonAdd {
  color: white !important;
}
</style>
