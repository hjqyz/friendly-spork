//食物列表组件
<template>
  <div>
    <!-- 食物列表 -->
    <ul class="detail">
          <li v-for="(item,index) in search_result" :key="index" @click="msg_show(index)">
              <img v-lazy="item.pic">
              <p>{{item.name}}</p>
          </li>
    </ul>
  </div>
</template>

<script>
import {instant} from "@/utils/api.js"        //axios请求实例
import shortid from "shortid"                 //生成唯一keys插件

export default {
data(){
 return {
     search_result:'',                        //搜索结果
     classid:this.$route.params.classid||''   //分类id，用于分类搜索
 }
},
//父组件数据绑定
props:['send_data'],
//渲染结束钩子
mounted(){
  //当请求由菜品分类组件跳转进入，更新父组件关联对象
  if(this.$route.params.classid!==undefined){
    this.changeMode({mode:'/byclass',search_data:{classid:this.$route.params.classid,start:'0',num:'10',appkey:'691f965841b58052'}})
  }
},
watch:{
  //监视关联数据，变动时发送新请求
     send_data:function (val) {
        //  console.log(val)
        //排除关联数据为空的情况
        if(val==""){return}
        //关联数据存在，提交请求
        instant.get(val.mode,{
          params:val.search_data
        }).then((res)=>{
           this.search_result=res.data.result.list
          //  console.log(this.search_result)
        })
     },
},
methods:{
    //生成唯一keys
    id_make(index){
                return shortid.generate(index)
            },
    // 主动修改父组件关联数据
    changeMode(res){
              this.$emit('change',res)
            },
    //菜品详情页显示
    msg_show(index){
              this.$emit('indexChange','2')
              this.$router.push({name:'item_msg',params:{data:this.search_result[index],from_item:this.send_data}})
              
            }
}
}
</script>

<style lang="less" scoped>
.detail{
    display:grid;
    grid-template-columns: 48% 48%;
    grid-template-rows:20vh;
    grid-column-gap:0.1rem;
    grid-row-gap:0.5rem;
    li{
        img{
            width: 15vh;
        }
    }
}
</style>