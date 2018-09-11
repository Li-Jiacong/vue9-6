<template>
    <div>
        <mt-swipe :auto="2500">
            <!-- 在组件中，使用v-for循环，一定要使用key -->
            <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i"> 
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../img/menu1.png" alt="">
                            <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../img/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../img/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
        
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            lunbotuList: [],    //保存轮播图的数组
        }
    },
    created(){
        this.getlunbotu();
    },
    methods:{
        getlunbotu(){
            this.$http.get('api/getlunbo').then(result=>{
                if(result.body.status === 0){   //result.body获取数据
                    // console.log(result.body);
                    this.lunbotuList = result.body.message;
                }else{
                    Toast('获取失败');
                }
            })
        }
    },
}
</script>


<style lang="scss" scoped>
    
    .mint-swipe {
        height: 200px;
        .mint-swipe-item{
            
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    body {
        background: #fff;
    }
    .mui-grid-view {
        background: #fff;
        border: 0;
        .mui-table-view-cell {
            border: 0;
            img {
                width: 60px;
                height: 60px;
            }
            .mui-media-body {
                font-size: 12px;
            }
        }
        
    }
    
        
    
</style>
