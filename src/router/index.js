import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import ShopCarContainer from '@/components/tabbar/ShopCarContainer'
import NewsInfo from '@/components/news/NewsInfo'
import NewsList from '@/components/news/NewsList'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HomeContainer',
      component: HomeContainer
    },{
      path: '/member',
      name: 'MemberContainer',
      component: MemberContainer
    },{
      path: '/search',
      name: 'SearchContainer',
      component: SearchContainer
    },{
      path: '/shopcar',
      name: 'ShopCarContainer',
      component: ShopCarContainer
    },{
      path: '/home/newslist',
      name: 'NewsList',
      component: NewsList
    },{
      path: '/home/newsinfo/:id',
      name: 'NewsInfo',
      component: NewsInfo
    },{
      path: '/home/photolist',
      name: 'PhotoList',
      component: PhotoList
    },{
      path: '/home/photoinfo/:id',
      name: 'PhotoInfo',
      component: PhotoInfo
    },{
      path: '/home/goodslist',
      name: 'GoodsList',
      component: GoodsList
    },{
      path: '/home/goodsinfo/:id',
      name: 'GoodsInfo',
      component: GoodsInfo
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类（默认的类为router-link-active）
})
