import store from "../../store/store.js";
export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true
        // Регистрируем контекстное меню в прототип
        Vue.prototype.$context = {
            // отправляет элемент в store на удаление
            deleteElement(value) {
                store.commit("deleteCost", value);
            },
            // отправляет данные в плагин модального окна, что бы открыл редактирование
            openModal(value) {
                value
                Vue.prototype.$modal.show(value)
            },
            // отправляет данные в планин модального окна
            editData(value) {
                Vue.prototype.$modal.edit({
                    index: value.index,
                    date: value.date,
                    category: value.category,
                    value: value.value,
                });
            }

        }
    }
}
