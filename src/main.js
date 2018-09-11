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
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
//导入路由模块
import router from './router.js';
//导入router-resource
import VueResource from 'vue-resource';
//导入moment
import moment from 'moment';
//安装懒加载
// Vue.use(Lazyload);

//将mint-ui全部加载而不是按需加载，是因为按需加载的时候懒加载的加载图标出不来
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//安装router-resource
Vue.use(VueResource);
Vue.http.options.root = 'http://47.89.21.179:8080';
Vue.http.options.emulateJSON = true;

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);   //轮播图组件
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

//安装图片预览插件,我装了1.0.1的版本，因为服务器传过来的格式最新版用不了
import VuePreview from 'vue-preview';
Vue.use(VuePreview);



//定义全局时间过滤器
Vue.filter('dateFormat',function(dateStr, pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dateStr).format(pattern);
})

var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router  //挂载路由对象
});

