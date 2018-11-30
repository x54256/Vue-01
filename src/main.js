// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
import './lib/mui/css/mui.min.css'
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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
