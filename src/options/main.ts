import Vue from 'vue'
import { Form, FormItem, Input, Button } from 'element-ui'
import App from './App.vue'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)

// eslint-disable-next-line no-new
new Vue({
  render(h) {
    return h(App)
  },
}).$mount('#app')
