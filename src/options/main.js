import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  render(h) {
    return h(App)
  },
}).$mount('#app')
