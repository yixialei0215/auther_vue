import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 手动配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'
// 添加请求拦截器
let axios_ob = axios.create({
  baseURL: 'http://localhost:8000'
});

axios_ob.interceptors.request.use((config) => {
  const tokenStr = sessionStorage.getItem('token')
  if (tokenStr){
    config.headers['Authorization'] = tokenStr
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
Vue.prototype.$http = axios_ob
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
