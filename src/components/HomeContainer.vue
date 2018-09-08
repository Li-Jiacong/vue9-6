<template>
    <div>
        <mt-swipe :auto="2500">
            <!-- 在组件中，使用v-for循环，一定要使用key -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url"> 
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <h3>HomeContainer</h3>
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
            this.$http.get('http://47.89.21.179:8080/api/getlunbo').then(result=>{
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
    
        
    
</style>
