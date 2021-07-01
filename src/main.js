// импорт библиотеки
import Vue from 'vue'
// директория наших компонентов
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
