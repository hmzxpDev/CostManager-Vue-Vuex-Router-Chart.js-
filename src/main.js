// импорт библиотеки
import Vue from 'vue'
// директория наших компонентов
import App from './App.vue'
import Paginate from 'vuejs-paginate'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.component('paginate', Paginate);