<template>
  <div>
    <!-- анимация модальных окон -->
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <!-- общее затемнение для всех модальных окон -->
      <div v-if="modalWindow" class="modal-overlay">
        <component :settings="settings" :is="modalWindow" />
      </div>
    </transition>
  </div>
</template>

<script>
import addingCosts from "./modalWindow/addingCosts.vue";
import editCosts from "./modalWindow/editCosts.vue";
export default {
  components: { addingCosts, editCosts },
  name: "modalWindow",
  data() {
    return {
      // имя нужно модального окна
      modalWindow: "",
      // данные которые получаем из шины событий и передаем в дочку
      settings: {},
    };
  },
  methods: {
    // получает название и открывает нужный компонент
    openModal(value) {
      this.modalWindow = value;
    },
    // получает данные из шины событий
    getDataEvent(settings) {
      this.settings = settings;
    },
  },
  created() {
    //   слушатели событий
    this.$modal.EventBus.$on("show", this.openModal);
    this.$modal.EventBus.$on("hide", this.openModal);
    this.$modal.EventBus.$on("edit", this.getDataEvent);
  },
  beforeDestroy() {
    //   удаляем слушатели событий
    this.$modal.EventBus.$off("show", this.openModal);
    this.$modal.EventBus.$off("hide", this.openModal);
    this.$modal.EventBus.$off("edit", this.getDataEvent);
  },
};
</script>

<style>
.animate__animated {
  animation-duration: 0.6s;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
}
</style>