//菜品分类画面
<template>
<div>
    <!-- 分类选择标签 -->
    <ul class="show">
        <li v-for="(item,index) in rtndata" :key="id_make(index)" @click="change(index)" :class="act_index==index?'act':''">{{item}}</li>
    </ul>
    <!-- 数据加载画面 -->
    <div class="show_load" v-if="pic_url.length==0"><img :src="require('../assets/loading.gif')" ></div>
    <!-- 分类详情标签 -->
    <ul class="detail" v-if="pic_url.length!==0">
        <li v-for="(item,index) in fnc_list" :key="id_make(index)" @click="id_send(index)" > <img :src="pic_url[index]" v-cloak><p>{{item}}</p></li>
    </ul>
</div>
</template>

<script>
import {instant} from "@/utils/api.js"         //axios请求实例：返回数据
import {pic_instant} from "@/utils/api.js"     //axios请求实例：图片获取
import shortid from "shortid"                  //生成唯一key插件

export default({
    data(){
        return {
            result:[],                         //返回结果
            rtndata:[],                        //返回分类选择标签名数组
            id_list:[],                        //返回id列表
            pic_url:[],                        //返回图片地址数组
            arrayKeys:[],                      //唯一keys数组
            fnc_list:[],                       //分类选择标签
            choose_id:'',                      //当前选择id
            act_index:0,                       //分类选择标签选中index
        }
    },
    //渲染前钩子
    beforeMount(){
        //非阻塞异步回调函数请求获取图片
          let temparr= new Array()
          this.img_get(0,temparr)
    },
    //渲染后钩子
    mounted(){
        //分类选择标签数据请求，默认第一个标签高亮
            instant.get('/class',{
                params:{
                    appkey:'691f965841b58052',
                }
            }).then((res)=>{
                // console.log(res)
                this.result=res.data.result
                this.rtndata=res.data.result.map(item=>item.name);
                this.change(0);//设置默认高亮
                })
        },
    methods:{
            //非阻塞异步回调函数请求获取图片
            img_get(i,temparr){
                i++;
                while(i<9){
                pic_instant.get('',{params:{return:"json"}}).then((res)=>{
                    if(res.data.imgurl==undefined){
                        this.img_get(i-1,temparr)
                    }else{
                        temparr.push(res.data.imgurl)
                        this.img_get(i,temparr)
                    }}).catch(error=>{console.log(error)})
                    return; 
                }
                // console.log(temparr)
                this.pic_url=temparr
            },
            //生成唯一keys
            id_make(index){
                return shortid.generate(index)
            },
            //依据分类选择标签名显示分类选择标签
            change(index){
                //当前选中分类选择标签名设置高亮效果
                this.act_index=index;
                //修改下方分类选择标签显示
                this.fnc_list=this.result.length>8?this.result[index].list.slice(0,8):this.result[index]
                this.id_list=this.fnc_list.map(item=>item.classid)
                this.fnc_list=this.fnc_list.map(item=>item.name)
                // console.log(this.id_list)
            },
            // 向食物列表组件发送选中id
            id_send(index){
            // console.log(this.id_list)
            this.choose_id=this.id_list[index];
            // console.log(this.choose_id)
            this.$emit('indexChange','0')  //主画面组件导航主动跳转
            this.$router.push({name:'main',params:{classid:this.choose_id}})  //发送选中id
            },
            img_load(){
                if(this.pic_url.length==0){
                return false;
                }else{
                return true
                }
            }
        }
    })
</script>

<style lang="less" scoped>
.show{
padding:2vh 0vh 2vh 0vh;
list-style: none;
display:flex;
flex-wrap:wrap;
justify-content:flex-start;
li{
    border-radius:0.2rem ;
    background: #f1b204;
    color:white;
    margin-right:0.5rem;
    margin-bottom: 0.5rem;
}
}
.detail{
    list-style: none;
    display:grid;
    grid-template-columns:48% 48%;
    grid-template-rows:repeat(4, 20.5vh);
    grid-column-gap:0.1rem;
    grid-row-gap:0.5rem;
    margin-top:0.5rem ;
   li{
       overflow: hidden;
       background: #ffffff;
       position: relative;
        color:#1b93f5;
        font-weight: bold;
        font-size:1.5rem ;
        text-align: center;
        line-height: 20vh;
        img{
            width:100% ;
            height:20.5vh ;
        }
        p{
            position: absolute;
            top: 35%;
            left: 0%;
        }
   }
}
[v-cloak]{
    display: none;
}
.show_load{
    height: 100%;
    // text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1b93f5;
}
.act{
    background: aqua !important;
}
</style>
