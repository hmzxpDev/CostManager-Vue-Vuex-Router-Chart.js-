<template>
  <div class="paymentList">
    <!-- Заголовки таблицы -->
    <v-row class="font-weight-bold mb-1 headdingPaymentList">
      <v-col :cols="1">#</v-col>
      <v-col :cols="4">Date</v-col>
      <v-col :cols="4">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <!-- содержимое таблицы -->
    <v-row
      :rows="4"
      v-for="item in getData"
      :key="item.index"
      class="borderPaymentList"
    >
      <v-col :cols="1">{{ item.index }}</v-col>
      <v-col :cols="4">{{ item.date }}</v-col>
      <v-col :cols="4">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col :cols="1">
        <!-- выпадающее меню -->
        <v-menu
          :close-on-click="true"
          :close-on-content-click="true"
          :offset-x="true"
          :offset-y="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <!-- кнопка открытия меню-->
            <v-btn
              color="black"
              dark
              v-bind="attrs"
              v-on="on"
              icon
              :ripple="false"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <!-- выпадающее меню -->
          <v-list>
            <v-list-item class="contextMenu d-flex flex-column pa-0">
              <v-list-item-title class="text-left">
                <!-- модальное окно -->
                <v-dialog
                  v-model="dialog"
                  max-width="400px"
                  :persistent="true"
                  :eager="true"
                >
                  <template v-slot:activator="{ on }">
                    <!-- кнопка редактирования -->
                    <button v-on="on" @click="editsCost(item)">
                      <v-icon>mdi-lead-pencil</v-icon> Редактировать
                    </button></template
                  >
                  <v-card>
                    <editCosts @closeModal="closeModal"></editCosts>
                  </v-card>
                </v-dialog>
                <!-- кнопка удаления -->
              </v-list-item-title>
              <v-list-item-title class="text-left contextDelete">
                <button @click="removesCost(item.index)">
                  <v-icon>mdi-delete</v-icon> Удалить
                </button>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import editCosts from "./modalWindow/editCosts.vue";
export default {
  name: "paymentList",
  data() {
    return {
      dialog: false,
    };
  },
  components: { editCosts },
  methods: {
    closeModal(value) {
      this.dialog = value;
    },
    removesCost(value) {
      this.$context.deleteElement(value);
    },
    editsCost(item) {
      this.$context.openModal(item);
    },
  },
  computed: {
    ...mapGetters(["displayedData"]),
    getData() {
      return this.displayedData;
    },
  },
};
</script>

<style lang="scss">
.borderPaymentList {
  border-top: 1px solid #f1f1f1;
  margin: 0px !important;
}
.headdingPaymentList {
  margin: 0px !important;
}
.contextDelete {
  width: 100%;
}

.contextMenu {
  min-height: 0px !important;
  button {
    border: 0px;
    width: 165px;
    text-align: left;
    height: 35px;
    background-color: white;
  }
  button:hover {
    background-color: #eee;
  }
}
</style>
