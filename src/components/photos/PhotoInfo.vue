<template>
    <div class="photoinfo-container">
        <!-- 新闻标题 -->
        <h3 class="title">{{PhotoInfo.title}}</h3>
        <!-- 时间和点击量信息 -->
        <p class="subtitle">
            <span>发表时间:{{PhotoInfo.add_time|dateFormat}}</span>
            <span>点击{{PhotoInfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区 -->
        <img class="preview-img" v-for="(item, index) in list" :src="item.src" :key="index" height="100" @click="$preview.open(index, list)">
        <!-- 内容区 -->
        <!--双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 v-html 指令：-->
        <div class="content" v-html="PhotoInfo.content"></div>
        <!-- 评论区 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            id: this.$route.params.id,
            PhotoInfo: {},
            list: []
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status == 0){
                    this.PhotoInfo = result.body.message[0];
                }else{
                    Toast("获取图片详细信息失败");
                }
            })
        },
        getThumbs(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status == 0){
                    result.body.message.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                    });
                    this.list = result.body.message;
                }else{
                    Toast("缩略图获取失败");
                }
            })
        }
    },
    components:{
        'commentBox': comment
    }
}
</script>

<style lang="scss">
    .photoinfo-container{
        padding: 3px;
        .title{
            font-size: 15px;
            text-align: center;
            color: #26a2ff;
            margin: 15px 0;
        }
        .subtitle{
            font-size: 13px;
            display: flex;
            justify-content: space-between;

        }
        .content {
            text-indent: 2em;
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>
