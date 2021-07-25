export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true

        // Регистрируем модальное окно в прототип
        Vue.prototype.$modal = {
            // Регистрируем глобальную шину событий
            EventBus: new Vue(),
            show(nameModalWindow) {
                this.EventBus.$emit("show", nameModalWindow);
            },

            hide(nameModalWindow) {
                this.EventBus.$emit("hide", nameModalWindow);
            }
            ,
            edit(settings) {
                this.EventBus.$emit("edit", settings);
            }

        }
    }
}
