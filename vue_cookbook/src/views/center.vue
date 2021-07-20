//主画面
<template>
    <div class="grid">
    <!-- 导航栏 -->
    <div class="nav">
       <p>导航</p>
       <ul>
         <li v-for="(item,index) in foot_list" :key="arrayKeys[index]" @click="act_check(index)" :class="index==act_item?act:''">{{item}}</li>
       </ul>
       <div>广告位</div>
    </div>
    <!-- 画面详细 -->
    <router-view @indexChange='indexChange'></router-view>
    </div>
</template>
<script>

export default ({
data(){
    return {
        act:"act",                                         //选中类
        foot_list:["美食导航","美食推荐","美食信息"],       //导航内容
        foot_PathList:['main','recommend','item_msg'],     //导航跳转组件名
        arrayKeys :[],                                     //导航栏key                         
        act_item:"",                                       //记录当前选中导航key                          
    }
},
methods:{
   //导航跳转功能
     act_check(keys){
        // 点击当前选中导航或信息栏，不触发响应
        if(keys==this.act_item || keys=='2'){return}
        //导航跳转
        this.$router.push({
            name:this.foot_PathList[keys],
        })
        //记录当前选中导航keys
        this.act_item=keys;
      },
        //画面组件改变导航选中
        indexChange(res){
           this.act_item=res
        } 
},
})
</script>
<style lang="less" scope>
 *{margin: 0px;padding: 0px;}
 html,body,#app,.home{
  height: 100%;
  .grid{ 
  display: grid;
  grid-template-columns: minmax(100px, 10%) 1fr;
  height: 100%;
  }}
  .act{
  background: chartreuse !important;
  color:white
}
  .nav{
    display:flex;
    flex-direction:column;
    height:100%;
    background: chocolate;margin-right:5px ;
    p{margin: 10px;text-align: center;}
    li{
      text-align: center;height: 3rem;line-height: 3rem;
      &:last-child{
        background: gainsboro;
      }
      }
    div:last-child{background: cornflowerblue;flex:1;text-align: center;padding: 40%;}
    }
</style>