import store from "../../store/store.js";
export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true

        Vue.prototype.$context = {
            EventBus: new Vue(),

            deleteElement(value) {
                store.commit("deleteCost", value);
            },
            openModal(value) {
                this.EventBus.$emit("edit", value);
            }
        }
    }
}
