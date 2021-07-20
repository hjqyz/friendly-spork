import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
//图片懒加载引入
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/error.png',
  loading: '@/assets/loading.gif',
  attempt: 1
})
//生产模式代码提示
Vue.config.productionTip = false
// 路由跳转画面滚动条置顶
router.afterEach(()=>{
    window.scrollTo(0,0);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
