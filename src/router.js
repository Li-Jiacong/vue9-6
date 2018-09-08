import VueRouter from 'vue-router';

import HomeContainer from './components/HomeContainer.vue';
import MemberContainer from './components/MemberContainer.vue';
import ShopcarContainer from './components/ShopcarContainer.vue';
import SearchContainer from './components/searchContainer.vue';

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/home',component: HomeContainer},
    {path: '/member',component: MemberContainer},
    {path: '/shopcar',component: ShopcarContainer},
    {path: '/search',component: SearchContainer}
  ],
  linkActiveClass:'mui-active'
});

// 把路由对象暴露出去
export default router;