<template>
    <div class="newsinfo-container">
        <!-- 新闻标题 -->
        <h3 class="title">{{NewsInfo.title}}</h3>
        <!-- 时间和点击量信息 -->
        <p class="subtitle">
            <span>发表时间:{{NewsInfo.add_time|dateFormat}}</span>
            <span>点击{{NewsInfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区 -->
        <!--双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 v-html 指令：-->
        <div class="content" v-html="NewsInfo.content"></div>
        <!-- 评论区 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>


<script>
import {Toast} from 'mint-ui';
import comment from '../subcomponents/comment.vue';
export default {
    data(){
        return {
            id: this.$route.params.id,
            NewsInfo: {}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status == 0){
                    this.NewsInfo = result.body.message[0];
                    // console.log(this.NewsInfo);
                }else{
                    Toast("获取失败");
                }
            })
        }
    },
    components:{
        'commentBox':comment
    }
}
</script>


<style lang="scss">     //在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 v-html 的内容设置带作用域的 CSS，你可以替换为 CSS Modules 或用一个额外的全局 <style> 元素手动设置类似 BEM 的作用域策略。
    .newsinfo-container{
        padding: 0 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color: dimgray;
            margin: 15px 0;
        }
        .subtitle{
            font-size: 12px;
            display: flex;
            justify-content: space-between;

        }
        .content{
            img{
                width: 100%;    //在v-html中不能使用带作用域的css样式，所以采用全局样式的方法，但是为了避免污染，给整个盒子加上了专属的类名
            }
        }
    }
</style>
