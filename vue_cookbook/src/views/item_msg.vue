//菜品详情页面
<template>
    <div>
        <!-- 菜品展示 -->
        <div class="msg_style">
            <div class='img_show'>
                <img v-lazy="$route.params.data.pic">
                <p class="item_title">{{$route.params.data.name}}</p>
            </div>
            <p><span class="title">材料:</span><br><span v-for="(item,index) in fnc_list" :key="index">{{use[index]}}<br></span></p>
        </div>
        <!-- 简介 -->
        <div>
            <h3>简介</h3>
            <div class="msg_detail"><p v-for="item,index in contents" :key="index">{{item}}<br></p></div>
        </div>
        <!-- 烹饪方法 -->
        <div>
            <h3>烹饪方法</h3>
            <div class="msg_detail"><p v-for="item,index in $route.params.data.process" :key="index">{{`${index+1}:${item.pcontent}`}}<br></p></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            fnc_list:this.$route.params.data.material|| [],                   //材料列表
            msg_content:this.$route.params.data.content||''                   //返回文本内容
        }
    },
    //渲染后钩子
    mounted(){
       //console.log(this.$route.params.data.process)
       //更新本地储存
       localStorage.from_data=JSON.stringify(this.$route.params.from_item) ;
    },
    computed:{
        //材料文本格式化
        use(){
            return this.$route.params.data.material.map(item=>`${item.mname}:${item.amount}`)
        },
        //简介文本格式化
        contents(){
            return this.msg_content.split('<br />')
        },
    },
}
</script>

<style lang="less" scope>
#p_style(){
        word-break:break-all;
        word-wrap:break-word;
}
.msg_style{
    display: flex;
    padding-top:2vh ;
    .img_show{
        img{
        width:23vh;
        height: 35vh;
        }
        
        margin-right: 1rem;
        .item_title{
            margin: auto;
            text-align: center;
            font-weight: bold;
            }
    }
    .title{
            font-weight:bold ;
            color:rgb(207, 218, 52);
        }
  .msg_detail>p{
        #p_style;
        width: 15vh;  
    }
}
.msg_detail{
    margin-top:2vh ;
    #p_style;
    text-indent:2em;
    
}
h3{
    color:rgb(207, 218, 52);
    margin-top:2vh ;

    }
</style>