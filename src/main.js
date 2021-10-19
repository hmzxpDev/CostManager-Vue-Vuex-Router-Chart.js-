// импорт библиотеки
import Vue from 'vue'
// директория наших компонентов
import App from './App.vue'
// стор хранения данных
import store from './store/store.js'
// роуты
import router from './router/router.js'

import('animate.css');
// plugins


import context from './plugins/contextMenu'
import vuetify from './plugins/vuetify'
Vue.use(context);


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
  context
}).$mount('#app')
