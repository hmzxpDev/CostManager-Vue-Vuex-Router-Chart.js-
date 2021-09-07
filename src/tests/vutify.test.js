import { test } from '@jest/globals';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import paymentList from '../components/paymentList';
import Vuex from 'vuex';
import Vuetify from 'vuetify'


let localVue = createLocalVue();
localVue.use(Vuex, Vuetify)

describe('тестируем paymentList', () => {
    let getters
    let store
    let vuetify
    beforeEach(() => {
        getters = {
            displayedData: () =>
                [
                    {
                        "index": 1,
                        "date": "2021-01-24",
                        "category": "Food",
                        "value": 100
                    },
                    {
                        "index": 2,
                        "date": "2021-04-13",
                        "category": "Transport",
                        "value": 100
                    },
                    {
                        "index": 3,
                        "date": "2021-03-15",
                        "category": "Housting",
                        "value": 100
                    },
                    {
                        "index": 4,
                        "date": "2021-06-11",
                        "category": "Clothing",
                        "value": 100
                    },
                    {
                        "index": 5,
                        "date": "2021-11-13",
                        "category": "Health",
                        "value": 100
                    },
                    {
                        "index": 6,
                        "date": "2021-01-24",
                        "category": "Food",
                        "value": 100
                    },
                    {
                        "index": 7,
                        "date": "2021-04-13",
                        "category": "Transport",
                        "value": 100
                    },
                    {
                        "index": 8,
                        "date": "2021-03-15",
                        "category": "Housting",
                        "value": 100
                    },
                    {
                        "index": 9,
                        "date": "2021-06-11",
                        "category": "Clothing",
                        "value": 100
                    },
                    {
                        "index": 10,
                        "date": "2021-11-13",
                        "category": "Health",
                        "value": 100
                    },
                ],
        }
        store = new Vuex.Store({
            getters
        })
        vuetify = new Vuetify()
    })
    test('чекаем html', () => {
        console.log(vuetify)
        const wrapper = shallowMount(paymentList, { store, localVue, vuetify });
        wrapper.find('test')
    })
})