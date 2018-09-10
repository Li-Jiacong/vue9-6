<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <textarea placeholder="请输入评论内容（120字以内）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content == ''? '该用户很懒，没有都没有留下':(item.content == 'undefined'? '该用户很懒，没有都没有留下':item.content)}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore" >加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
    data(){
        return{
            pageIndex:1,
            comments:[],
            msg:''
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
            .then(result=>{
                if(result.body.status == 0){
                    // console.log(result.body)
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast("获取失败")
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComment();
        },
        postComment(){
            if(this.msg.trim().length == 0){
                return Toast("评论内容不能为空");
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{
                content: this.msg.trim()
            }).then(result=>{
                if(result.body.status == 0){
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = "";
                }else{
                    Toast("获取失败");
                }
            })
        }
    },
    props:["id"]
}
</script>


<style lang="scss" scoped>
    .cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background: #ccc;
            }
            .cmt-body{
                line-height: 35px;
            }
        }
    }
}
</style>
