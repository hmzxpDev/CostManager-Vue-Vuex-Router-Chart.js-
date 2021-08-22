import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        // Метод загрузки данных
        async fetchData(context) {
            const res = await fetch("https://raw.githubusercontent.com/hmzxpDev/API/main/item.json")
            const getData = await res.json();
            context.commit('getData', getData);
        },
    },
    mutations: {
        /**
          * метод который записывает полученные данные с гита в state
        */
        getData(state, getData) {
            state.data = getData;
        },
        /**
         * метод добавляет новые затраты в общий список
         */
        createCost(state, newCost) {
            state.data.push(newCost)
        },
        /**
         * метод находит по индексу обьект и удаляет его
         */
        deleteCost(state, index) {
            for (var i = 0; i < state.data.length; i < i++) {
                if (state.data[i].index === index) {
                    state.data.splice(i, 1)
                    break;
                }
            }
        },
        /**
         * метод записывает номер страницы в state
         */
        paginateComp(state, listNumber) {
            state.listNumber = listNumber;
        },
        /**
         * метод меняет свойства у существующих данных
         */
        updateData(state, obj) {
            for (var i = 0; i < state.data.length; i < i++) {
                if (state.data[i].index === obj.index) {
                    state.data[i].date = obj.date
                    state.data[i].category = obj.category
                    state.data[i].value = obj.value
                    break;
                }
            }

        }

    },
    state: {
        data: [],
        // номер страницы
        listNumber: 1,
        // количество обьектов в одной странице
        quantityInList: 10,
        // категории расходов
        category: ['Food', 'Transport', 'Housting', 'Clothing', 'Health'],
    },
    getters: {
        // отрисовывает в зависимости от нажатого листа
        dataPaymentList(state) {
            return state.data.slice(-state.quantityInList + (state.listNumber * state.quantityInList), 0 + (state.listNumber * state.quantityInList))
        },
        // передает в paginate количество страниц для кнопок вперед и назад
        compListNumber(state) {
            return Math.ceil(state.data.length / state.quantityInList);
        },
        // в addingCosts для правильного подставления индекса
        dataGetter(state) {
            return state.data;
        },
        // массив чисел для кнопок пагинации
        arrayPaginate(state) {
            let arr = [];
            for (let i = 1; i < state.data.length / state.quantityInList + 1; i++) {
                arr.push(i)
            }
            return arr;

        },
        // передаем массив категорий в addingCosts, что бы отрисовать select
        categoryGetter(state) {
            return state.category;
        }
    }
})