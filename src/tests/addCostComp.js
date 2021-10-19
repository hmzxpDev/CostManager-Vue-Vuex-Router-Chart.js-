import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import addingCosts from "../components/modalWindow/addingCosts.vue";

// создаем локальный компонент vue
const localVue = createLocalVue();

// Подключаем хранилище Vuex
localVue.use(Vuex);

// Моки роутинга, т.к. не хочу залазить в UI тестирование
const $route = {
    query: '/some/id',
}
const $router = {
    push: jest.fn()
}
// Моки модального окна
const $modal = {
    hide: jest.fn()
}

describe('unit test for addingCosts components', () => {
    // актуальная дата
    let today = () => {
        let date = new Date();
        let d = ("0" + date.getDate()).slice(-2);
        let m = ("0" + (date.getMonth() + 1)).slice(-2);
        let y = date.getFullYear();
        return `${y}-${m}-${d}`;
    }
    // то что присутствует в компоненте от Vuex
    let getters
    let store
    let mutations

    beforeEach(() => {
        getters = {
            dataGetter: () => [
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
                }
            ],
            categoryGetter: () => ['Food', 'Transport', 'Housting', 'Clothing', 'Health'],
        }
        mutations = {
            createCost: () => {
                return {
                    index: getters.dataGetter()[getters.dataGetter().length - 1].index + 1, // должен получить 3, ради чего и вызывался геттер
                    date: today(), // актуальная дата
                    category: 'Health', // в момент проверка теста "inputs and buttons work correctly", будет равен этим значениям
                    value: '300',
                }
            }
        }
        store = new Vuex.Store({
            getters, mutations
        })
    })
    test('instance vue should initialize correctly', () => {
        const wrapper = shallowMount(addingCosts, {
            store, localVue, mocks: {
                $route, $router, $modal
            }
        })
        expect(wrapper.exists()).toBeTruthy();
        // сравниваем с актуальной датой
        expect(wrapper.vm.$data.date).toEqual(today());
        // значение данных по умолчанию
        expect(wrapper.vm.$data.category).toBe('Food');
        expect(wrapper.vm.$data.value).toBe(100);
        expect(wrapper.vm.$data.error).toBe('Заполните все данные корректно');
        expect(wrapper.vm.$data.errorBefor).toBe(false);

    });

    test('inputs and buttons work correctly', async () => {
        const wrapper = shallowMount(addingCosts, {
            store, localVue, mocks: {
                $route, $router, $modal
            }
        })
        // инпут даты
        const inputDate = wrapper.find('.inputDate');
        inputDate.setValue('1999-01-14')
        expect(wrapper.vm.$data.date).toBe('1999-01-14');

        // селектор категории
        const select = wrapper.find('select');
        select.setValue('Health');
        expect(wrapper.vm.$data.category).toBe('Health');

        // инпут значения
        const inputValue = wrapper.find('.inputValue');
        inputValue.setValue(300);
        expect(wrapper.vm.$data.value).toBe('300');

        // нажатие в итоге должно задействовать мутацию
        wrapper.find('.buttonADD').trigger('click');
        expect(mutations.createCost()).toEqual({
            index: 3,
            date: '2021-08-22',
            category: 'Health',
            value: '300',
        });


        // нажатие кнопки должно сбросить данные в инстансе
        wrapper.find('.buttonClose').trigger('click');
        expect(wrapper.vm.$data.date).toBe(today());
        expect(wrapper.vm.$data.category).toBe('');
        expect(wrapper.vm.$data.value).toBe('');

        // скрыть ошибку
        expect(wrapper.vm.$data.errorBefor).toEqual(false);
    });

    test('getters from the store should work', () => {
        const wrapper = shallowMount(addingCosts, {
            store, localVue, mocks: {
                $route, $router, $modal
            }
        })
        // проверяем сколько отрисовалось элементов option, должно быть больше на 1 чем в массиве categoryGetter
        expect(wrapper.findAll('option').length).toBe(getters.categoryGetter().length + 1)

        // работа dataGetter проверена в тесте выше
    });

    test('typing error appears when needed', () => {
        const wrapper = shallowMount(addingCosts, {
            store, localVue, mocks: {
                $route, $router, $modal
            }
        })
        // по умолчанию она скрыта
        expect(wrapper.vm.$data.errorBefor).toEqual(false);
        // провоцируем ее появится
        const inputValue = wrapper.find('.inputValue');
        inputValue.setValue('');
        wrapper.find('.buttonADD').trigger('click');
        expect(wrapper.vm.$data.errorBefor).toEqual(true);
    })

})