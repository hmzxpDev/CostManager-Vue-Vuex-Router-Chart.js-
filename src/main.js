// импорт библиотеки
import Vue from 'vue'
// директория наших компонентов
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

Vue.component('paginate', Paginate);