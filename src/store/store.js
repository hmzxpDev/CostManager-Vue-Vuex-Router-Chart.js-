import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        async fetchData(context) {
            const res = await fetch("https://raw.githubusercontent.com/hmzxpDev/API/main/item.json")
            const getData = await res.json();
            context.commit('getData', getData);
        },
    },
    mutations: {
        getData(state, getData) {
            state.data = getData;
        },
        createCost(state, newCost) {
            state.data.push(newCost)
        },
        deleteCost(state, index) {
            for (var i = 0; i < state.data.length; i < i++) {
                if (state.data[i].index === index) {
                    state.data.splice(i, 1)
                    break;
                }
            }
        },
        updateCost(state, obj) {
            state.data = state.data.map((currentValue) => {
                if (currentValue.index === obj.index) {
                    currentValue.date = obj.date
                    currentValue.category = obj.category
                    currentValue.value = obj.value
                }
                return currentValue
            })
        },
        listUpdate(state, listNumber) {
            state.listNumber = listNumber;
        },
    },
    state: {
        data: [],
        listNumber: 1,
        quantityInList: 10,
        category: ['Transport', 'Food', 'Housting', 'Health', 'Clothing'],
    },
    getters: {
        displayedData(state) {
            return state.data.slice(-state.quantityInList + (state.listNumber * state.quantityInList), 0 + (state.listNumber * state.quantityInList))
        },
        paginationLenght(state) {
            return Math.ceil(state.data.length / state.quantityInList);
        },
        dataGetter(state) {
            return state.data;
        },
        categoryGetter(state) {
            return state.category;
        },
    }
})