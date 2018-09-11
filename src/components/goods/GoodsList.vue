<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="" alt="">
            <h2 class="title"></h2>
            <div class="info">
                <p class="price">
                    <span class="now"></span>
                    <span class="old"></span>
                </p>
                <p class="sell">
                    <span></span>
                    <span></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
                .new{
                    font: red;
                    font-weight: bold;
                    font-style: 16px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-style: 12px;
            }
        }
    }
}
</style>
