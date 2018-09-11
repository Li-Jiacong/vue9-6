<template>
    <div>
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)"> 
                            <!-- tap是mui自带的 -->
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
        <ul class="photo-list">
            <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photolist/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h2 class="info-title">{{item.title}}</h2>
                    <p class="info-zhaiyao">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";//因为顶部滑动功能是一个js组件，这个js文件不能在严格模式下使用，所以装包去除严格模式
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            cates: [],
            list: []
        }
    },
    mounted(){//涉及DOM操作，需要等DOM元素挂载上去之后才能操作
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    methods:{
        getAllCategory(){
            this.$http.get("api/getimgcategory").then(result=>{
                if(result.body.status == 0){
                    result.body.message.unshift({title:"全部",id:"0"});
                    this.cates = result.body.message;
                }else{
                    Toast("图片分类获取失败");
                }
            })
        },
        getPhotoListByCateId(cateId){
            this.$http.get("api/getimages/"+cateId).then(result=>{
                if(result.body.status == 0){
                    this.list = result.body.message;
                }else{
                    Toast("图片列表获取失败");
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}

.photo-list{
    margin: 0;
    padding: 10px 10px 0;
    list-style: none;
    li{
        position: relative;
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        img{
            width: 100%;
            vertical-align: bottom;//把基线对奇会多出来的几像素去掉
            box-shadow: 0 0 9px #999;
        }
        img[lazy=loading]{
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            max-height: 84px;
            overflow: hidden;
            .info-title{
                font-size: 14px;
                color: #fff;
            }
            .info-zhaiyao{
                font-size: 13px;
                color: #fff;
            }
        }
    }
}
</style>
