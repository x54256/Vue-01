// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// vue插件的debug模式
Vue.config.devtools = true


// 按需导入组件，导入css
// import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import Mint from 'mint-ui';
Vue.use(Mint);


// 导入 MUI 的样式
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// npm install axios
import axios from 'axios'
axios.defaults.timeout = 2000; // 设置axios的请求时间
axios.defaults.baseURL = "http://127.0.0.1:8081/"; // 设置axios的基础请求路径

Vue.prototype.$http = axios;// 将axios赋值给Vue原型的$http属性，这样所有vue实例都可使用该对象



import LyTab from 'ly-tab'
Vue.use(LyTab)


// 缩略图组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

// 步进器组件
import 'vant/lib/index.css';
import { Stepper } from 'vant';
Vue.use(Stepper);


// vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {

    addToCar(state,obj){
      var flag = false;

      // some方法：对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。

      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count += obj.count;  // 修改购物车商品数量
          flag = true;
          return true
        }
      });
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可
      if (!flag){
        state.car.push(obj)
      }

      // 3.当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))

    },

    updateItemNum(state,obj){

      state.car.some(item => {
        if (item.id === obj.id){
          item.count = parseInt(obj.count);
          return true;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    removeItem(state,id){
      state.car.some((item,i) => {  // i是当前循环的索引
        if (item.id === id){
          state.car.splice(i,1);
          return true;
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {
    getCount: function (state) {
      var num = 0;

      state.car.forEach(item => {
        num += item.count;
      });

      return num;
    },

    getCar: (state) => {
      return state.car
    },

    getSeleectNumAndPrice: state => {

      var info = {
        count: 0,
        amount: 0
      };

      state.car.forEach(x => {

        if (x.selected === true) {
          info.count += x.count;
          info.amount += x.count * x.price
        }
      });

      return info
    }


  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
