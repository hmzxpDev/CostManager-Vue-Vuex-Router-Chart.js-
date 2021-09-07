<template>
  <div class="modal d-flex flex-column pa-4">
    <span class="font-weight-bold"> Edit cost:</span>
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
            @click="sendUpdateData"
            :ripple="false"
            color="teal"
            :disabled="!valid"
            class="buttonAdd font-weight-lighter"
            >Edit</v-btn
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
  name: "editCosts",
  data() {
    return {
      modal: false,
      lazy: false,
      valid: false,
      index: null,
      date: "",
      category: "",
      value: 0,
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
    };
  },
  methods: {
    closeModalWindow() {
      this.$emit("closeModal", false);
    },
    ...mapMutations(["updateCost"]),
    // метод отправляет данные в store
    sendUpdateData() {
      let object = {
        index: this.index,
        date: this.date,
        value: +this.value,
        category: this.category,
      };
      this.updateCost(object);
      this.closeModalWindow();
    },
  },
  computed: {
    ...mapGetters(["categoryGetter"]),
    getCategory() {
      return this.categoryGetter;
    },
  },
  created() {
    this.$context.EventBus.$on("edit", (value) => {
      this.index = value.index;
      this.date = value.date;
      this.category = value.category;
      this.value = value.value;
    });
  },
  beforeDestroy() {
    this.$context.EventBus.$off("edit", (value) => {
      this.index = value.index;
      this.date = value.date;
      this.category = value.category;
      this.value = value.value;
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep .buttonAdd {
  color: white !important;
}
</style>