// 入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//导入app根组件
import app from './App.vue';
 
//导入mui的样式
import './lib/mui/css/mui.min.css';
//导入mui购物车图标样式
import './lib/mui/css/icons-extra.css';
//按需导入mint-ui组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
//导入路由模块
import router from './router.js';
//导入router-resource
import VueResource from 'vue-resource';
//安装router-resource
Vue.use(VueResource);

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);   //轮播图组件
Vue.component(SwipeItem.name, SwipeItem);   //轮播图组件


var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router  //挂载路由对象
});

