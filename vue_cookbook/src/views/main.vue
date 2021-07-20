//搜索画面 
<template>
  <div class="home">
      <div class="contend">
        <!-- 页面固定html -->
        <h1>老八厨房菜</h1>
        <h3>找到回家的感觉</h3>
        <div><input type="text" v-model.trim="search_data" placeholder="--请输入食材名称,例:白菜--">
        <a href="#"><div class="btn" @click="search">搜索</div></a>
        </div>
        <!-- 食物列表组件 -->
        <router-view :send_data='send_data' @change="changeMode" @indexChange='indexChange'></router-view>
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        search_data:'',              //搜索内容
        send_data:{}                 //关联对象，子组件渲染依据
      }
    },
    // 渲染结束钩子 
    mounted(){
      //依据上次请求头更新缓存数据
     if(this.send_data.mode=='/byclass'){
         localStorage.from_data=JSON.stringify(this.$route.params.from_item) ;
      }
      //还原上次请求显示内容
    this.send_data=typeof(localStorage.from_data)=="undefined"?{mode:'/search',search_data:{keyword:'白菜',num:"10",appkey:'691f965841b58052'}}:this.send_data.mode=='/byclass'?this.send_data:JSON.parse(localStorage.from_data)
    //还原结束，清空缓存 
    localStorage.clear()
    
    },
    methods:{
      //搜索方法
     search(){
      // 排除输入为空的情况
       if(this.search_data==""){ return}
      // 输入不为空，生成请求对象
       this.send_data={mode:'/search',search_data:{keyword:this.search_data,num:"10",appkey:'691f965841b58052'}}
     },
     //子组件主动修改关联对象
     changeMode(res){
       this.send_data=res;
     },
     //修改主画面组件导航条显示
     indexChange(res){
       this.$emit('indexChange',res)
     }
    },
}
</script>

<style scope lang="less">
.button{
  width: 2rem;
  height: 2rem;
  background: #83d9f3;
  text-align: center;
  display: inline-block;
  margin-left:1rem ;
  border-radius: 0.3rem;
  line-height: 2rem;
}
.btn{.button()}
.contend{
  text-align: center;
  h1{
    color: rgb(255, 0, 212);
  }
    h3{
      color: rgba(180, 180, 180, 0.507);
      margin-bottom: 0.5rem;
    }
    ul{display: grid;list-style: none;}
  }
</style>
