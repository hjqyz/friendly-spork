import Vue from 'vue'
import VueRouter from 'vue-router'
import center from '../views/center.vue'
// import home from '../views/Home.vue'
import main from '../views/main.vue'
import recommend from '../views/recommend.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'center',
    component:center,
    redirect:{name:'home'},
    children:[
      {
        path: "/",
        component: main,
        meta: {
          title: "搜索页"
        },
        children:[{
        path: "/",
        name:'main',
        component: ()=>import('../views/item_detail.vue'),
        }]
      },{
        path: "/",
        name: "recommend",
        component: recommend,
        meta: {
          title: "分类页"
        }
      },{
        path: "/",
        name: "item_msg",
        component: ()=>import('../views/item_msg.vue'),
        meta: {
          title: "详情显示页"
        }
      }

    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
