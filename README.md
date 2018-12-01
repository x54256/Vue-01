# vue1.0

## 1、Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 2、制作首页App组件

![image-20181128091801598](https://ws1.sinaimg.cn/large/006tNbRwly1fxnigc11ooj30n20yw3zq.jpg)

1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件

   ```js
   main.js
   
   // 按需导入组件，导入css
   import { Header, Swipe, SwipeItem } from 'mint-ui'
   import 'mint-ui/lib/style.css'
   Vue.component(Header.name, Header);
   Vue.component(Swipe.name, Swipe);
   Vue.component(SwipeItem.name, SwipeItem);
   
   App.vue
   <!--顶部Header区域-->
   <mt-header title="鑫哥棒棒哒-Vue项目" fixed/>
   ```

2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html

   main.js

   ```js
   // 导入 MUI 的样式
   import './lib/mui/css/mui.min.css'
   // 导入扩展图标样式
   import './lib/mui/css/icons-extra.css'
   ```

   App.vue

   ```vue
   <!--底部Tabbar区域-->
   <nav class="mui-bar mui-bar-tab">
       <router-link class="mui-tab-item" to="/home">
           <span class="mui-icon mui-icon-home"></span>
           <span class="mui-tab-label">首页</span>
       </router-link>
       <router-link class="mui-tab-item" to="/member">
           <span class="mui-icon mui-icon-contact"></span>
           <span class="mui-tab-label">会员</span>
       </router-link>
       <router-link class="mui-tab-item" to="/shopcar">
           <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
               <span class="mui-badge">0</span>
           </span>
           <span class="mui-tab-label">购物车</span>
       </router-link>
       <router-link class="mui-tab-item" to="/search">
           <span class="mui-icon mui-icon-search"></span>
           <span class="mui-tab-label">搜索</span>
       </router-link>
   </nav>
   ```

- 在制作 购物车 小图标的时候，操作会相对多一些：
- 先把 扩展图标的 css 样式，拷贝到 项目中
- 拷贝 扩展字体库 ttf 文件，到项目中
- 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`

3.要在 中间区域放置一个 router-view 来展示路由匹配到的组件

![image-20181128092258401](https://ws2.sinaimg.cn/large/006tNbRwly1fxnilgavddj30zr0u0wmg.jpg)

## 3、改造 tabbar 为 router-link，设置路由高亮

![image-20181128092344998](https://ws3.sinaimg.cn/large/006tNbRwly1fxnimd1sz6j31ag0u0dmn.jpg)

## 4、制作首页轮播图布局

![image-20181128092436828](https://ws1.sinaimg.cn/large/006tNbRwly1fxnin9rge1j30ki0yotk2.jpg)

HomeContainer.vue

```vue
<!-- 轮播图区域 -->
<mt-swipe :auto="4000">
    <!--在组件中，使用v-for循环的话，一定要使用 key -->
    <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="">
    </mt-swipe-item>
</mt-swipe>

<script>

  import {Toast} from "mint-ui";	// 弹窗效果

  export default {
    name: "home-container",
    data() {
      return {
        // 轮播图数据
        lunbotuList: []
      }
    },
      methods: {
        getLunbotu() {
          // 获取轮播图数据的方法
          this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
            if (result.body.status === 0) {
              // 成功了
              this.lunbotuList = result.body.message;
            } else {
              // 失败的
              Toast("加载轮播图失败。。。");
            }
          }, reason => {
            Toast("加载轮播图失败。。。");
          });
        }
      },
      created() {
        this.getLunbotu()
      }
  }
</script>

<!--默认创建出来的工程不支持scss，需要安装scssload，并进行配置

npm i node-sass --save-dev
npm i sass-loader --save-dev

webpack.base.conf.js
	{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] } // 处理 scss 文件的 loader
-->
<style scoped lang="scss">
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        background-color: blue;
      }
      &:nth-child(3) {
        background-color: cyan;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
```

### 4.1 加载首页轮播图数据

1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 5、改造 九宫格 区域的样式

HomeContainer.vue

```vue
<!-- 九宫格 到 6宫格 的改造工程 -->
<ul class="mui-table-view mui-grid-view mui-grid-9">
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu1.png" alt="">
    <div class="mui-media-body">新闻资讯</div></a></li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu2.png" alt="">
    <div class="mui-media-body">图片分享</div></a></li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu3.png" alt="">
    <div class="mui-media-body">商品购买</div></a></li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu4.png" alt="">
    <div class="mui-media-body">留言反馈</div></a></li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu5.png" alt="">
    <div class="mui-media-body">视频专区</div></a></li>
  <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
    <img src="../images/menu6.png" alt="">
    <div class="mui-media-body">联系我们</div></a></li>
</ul>

<style>
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>
```

## 6、中间区域添加动画

app.vue

```vue
<!-- 中间路由router-view区域 -->
<transition>
    <router-view/>
</transition>

<style lang="scss" scoped>
  #app{
    padding-top: 40px;
    overflow-x: hidden; /*将横向滚轮取消*/
  }

  /*入场动画*/
  .v-enter {
    opacity: 0;
    transform: translateX(100%);  /*平移100%*/
  }

  /*出场动画*/
  .v-leave-to {
    opacity: 0; /*不透明度*/
    transform: translateX(-100%);  /*与入场动画相反的平移100%*/
    position: absolute; /*将位置固定住，否则会出现 飘～ 的情况*/
  }

  /*入场和出场耗时和效果*/
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
</style>
```

## 7、新闻资讯 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html

2. 使用 vue-resource 获取数据

   ```js
   // npm install axios
   import axios from 'axios'
   axios.defaults.timeout = 2000; // 设置axios的请求时间
   axios.defaults.baseURL = "http://127.0.0.1:8081/"; // 设置axios的基础请求路径
   
   Vue.prototype.$http = axios;// 将axios赋值给Vue原型的$http属性，这样所有vue实例都可使用该对象
   ```

3. 渲染真实数据

   1. 定义局部过滤器：切割文字 filterFun

   2. 定义全局过滤器：日期格式转换

      > ```js
      > main.js
      > // 导入格式化时间的插件
      > import moment from 'moment'
      > // 定义全局的过滤器
      > Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
      >   return moment(dataStr).format(pattern)
      > })
      > ```

```vue
<template>
  <div>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.imgUrl">
          <div class="mui-media-body">
            <h1>{{ item.title | filterFun }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.addTime | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>

  </div>
</template>

<script>
  import {Toast} from "mint-ui";

  export default {
    name: "news-list",
    data() {
      return {
        newslist: []
      }
    },
    created() {
      this.getNewsList();
    },
    methods: {
      getNewsList() {
        this.$http.get("news").then(result => {
          if (result.status === 200) {
            // 如果没有失败，应该把数据保存到 data 上
            this.newslist = result.data;
            console.log(result)
          } else {
            Toast("获取新闻列表失败！");
          }
        })
      }
    },
    // 自定义过滤器
    filters: {
        filterFun: function (value) {
          if(value&& value.length > 18) {
            value= value.substring(0,18)+ '...';
          }
          return value;
        }
    }
  }
</script>


<style lang="scss" scoped>
  .mui-table-view {
    li {
      h1 {
        font-size: 15px;
      }
      .mui-ellipsis {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
      }
    }
  }
// display:flex;/*flex块级，inline-flex:行内快*/
  // justify-content:space-around;/*center:水平居中,flex-start:靠左;flex-end:靠右；space-between:两边的向两边靠，中间等分；space-around:完美的平均分配*/
  // align-items:stretch;/*center:垂直居中、flex-start：至顶、flex-end:至底、space-between、space-around*/　　
  // flex-direction: row;/*column从上向下的排列，column-reverse、row:从左到右，row-reverse:从右向左*/
  // flex-wrap:wrap;/*wrap多行显示（父容器不够显示的时候，从上到下）、nowrap(当容器不够宽的时候，子元素会平分父容器的宽或者高)、wrap-reverse:从下向上*/
</style>
```

## 8、实现新闻详情页面
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

```vue
<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.addTime | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>

   import comment from "../subcomponents/Comment.vue"
   import Toast from "mint-ui/packages/toast/src/toast";

    export default {
      name: "news-info",
      data() {
        return {
          id: this.$route.params.id,
          newsInfo: {}
        }
      },
      created() {
        this.findNewsById();
      },
      methods: {
        findNewsById(){
          this.$http.get("news/" + this.id).then(result => {
            if (result.status === 200) {
              // 如果没有失败，应该把数据保存到 data 上
              this.newsInfo = result.data;
              console.log(result)
            } else {
              Toast("获取新闻"+ this.id +"失败！");
            }
          })
        }
      },
      components: {
        "comment-box": comment
      }
    }
</script>

<style lang="scss">
  .newsinfo-container {
    padding: 0 4px;
    .title {
      font-size: 16px;
      text-align: center; // 居中
      color: red;
      padding: 15px 0;
    }
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }

  // 此处要生效，需要将style上的scope删除，不知道为啥
  .content {
    img {
      width: 100%;
    }
  }

</style>
```

## 9、由于有多个地方都用到了评论组件，所以我们可以单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即
5. 为`加载更多`按钮添加点击事件
  为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组

```vue
<template>

  <div class="cmt-container">
    <h3>发表评论</h3>

    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120"></textarea>
    <mt-button class="cmt-btn" type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(comment, i) in comments" :key="comment.id">
        <div class="cmt-title">
          第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{ comment.userName }}&nbsp;&nbsp;发表时间：{{ comment.addTime | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ comment.content }}
        </div>
      </div>
    </div>

    <mt-button class="cmt-btn" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>

</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        name: "comment",
        data() {
          return {
            comments: [],
            pageIndex: 0
          }
        },
        created() {
          this.findCommentsByNewsId()
        },
        methods: {
          findCommentsByNewsId(){
            this.$http.get("comments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
              if (result.status === 200) {
                // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                this.comments = this.comments.concat(result.data);

                console.log(result.data)
              } else {
                Toast("获取新闻"+ this.id +"的评论失败！");
              }
            })
          },
          getMore(){
            this.pageIndex += 1;
            this.findCommentsByNewsId()
          }
        },
        props: ['id']
    }
</script>

<style scoped lang="scss">
  .cmt-container {
    h3 {
      font-size: 18px;
    }
    textarea {
      height: 85px;
      font-size: 14px;
      margin: 0;
      padding: 10px;
    }
    .cmt-btn {
      margin: 5px 0;
    }
    .cmt-list {
      .cmt-item {
        font-size: 15px;
        .cmt-title {
          line-height: 30px;
          background-color: #cccccc;
        }
        .cmt-body {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>
```

## 10、顶部滚动条

使用第三方组件 [ly-tab](https://github.com/ScoutYin/ly-tab)

修改组件内容

![image-20181130101208725](https://ws4.sinaimg.cn/large/006tNbRwly1fxpv98w1e8j31bg0q2dlx.jpg)

![image-20181130101244706](https://ws2.sinaimg.cn/large/006tNbRwly1fxpv9vaf6kj30jw05kt9f.jpg)

使用小问题：（此部分截图包含向子组件传递方法的知识点）

![image-20181130101342370](https://ws4.sinaimg.cn/large/006tNbRwly1fxpvavcf2sj31m805k0u7.jpg)

![image-20181130101517297](https://ws1.sinaimg.cn/large/006tNbRwly1fxpvci0ph9j30u00udqbh.jpg)

## 11、图片列表区域设置

![image-20181130142208494](https://ws3.sinaimg.cn/large/006tNbRwly1fxq2hcnqvlj30j40x8tnl.jpg)

```vue
<!-- 图片列表区域 -->
<ul class="photo-list">
  <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
    <img v-lazy="item.img_url">
    <div class="info">
      <h1 class="info-title">{{ item.title }}</h1>
      <div class="info-body">{{ item.zhaiyao }}</div>
    </div>
  </router-link>
</ul>

// 样式
<style lang="scss">

  .photo-list-container {
    .ly-tabbar {
      position: fixed;
      z-index: 2;
      background-color: rgba(255 ,255, 255, 1);
      .ly-tab-list {
        padding: 7px;
      }
    }
  }

  .photo-list {
    list-style: none; // 将· 删除
    margin: 0;
    padding: 28px 5px;

    li {
      background-color: #ccc;
      text-align: center; // 水平对其方式
      position: relative; // 将其位置整成相对的
      margin: 10px 0;

      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      img {
        width: 100%;
        vertical-align: middle; // 将下面突出的灰色背景色隐藏
      }
      .info {
        color: white; // 文字颜色为白色
        text-align: left; // 左对齐
        position: absolute; // 位置=>绝对
        bottom: 0;  // 设置它距离底部为0
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4); // 设置背景色（为了透明度才这么写）
        max-height: 84px;
        .info-title {
          font-size: 14px;
        }
        .info-body {
          font-size: 13px;
        }
      }
    }
  }
</style>
```

### 12、图片详情页面

![image-20181130142247915](https://ws3.sinaimg.cn/large/006tNbRwly1fxq2i1azxmj30jo0xsdph.jpg)

使用了[Vue preview](https://github.com/LS1231/vue-preview)实现缩略图展示

```vue
<template>
    <div class="photoinfo-container">

      <!--标题区域-->
      <h1>标题</h1>
      <div class="sub-title">
        <span>发表时间：xxxxxxx</span>
        <span>点击xx次</span>
      </div>
      <hr/>


      <!--缩略图区域-->
      <div class="thumb-parent">
        <div class="thumbs">
          <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
      </div>

      <div class="content">图片内容</div>
      <!--评论子组件-->
      <cmt-box :id="id"></cmt-box>


    </div>
</template>

<script>

    import comment from "../subcomponents/Comment.vue"
    import CmtBox from "../subcomponents/Comment";

    export default {
      name: "photo-info",
      data () {
        return {

          id: this.$route.params.id,
          slide1: [
            {
              src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
              msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
              alt: 'picture1',
              title: 'Image Caption 1',
              w: 600,
              h: 400
            },
            {
              src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
              msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
              alt: 'picture2',
              title: 'Image Caption 2',
              w: 1200,
              h: 900
            },
            {
              src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
              msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
              alt: 'picture2',
              title: 'Image Caption 2',
              w: 1200,
              h: 900
            }
          ]
        }
      },
      methods: {
        handleClose () {
          console.log('close event')
        }
      },components: {
        // 注册 评论子组件
        CmtBox,
        "cmt-box": comment
      }
    }
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;
    h1 {
      font-size: 18px;
      margin: 8px 0;
      text-align: center;
    }
    .sub-title {
      color: #26a2ff;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin: 0 5px;
    }
    .content {
      font-size: 13px;
      line-height: 30px;
    }
  }
</style>

<style lang="scss">
  .photoinfo-container {
    .thumb-parent{
      .thumbs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between; // 靠两边对其
        margin: 10px;
        figure {
          width: 50%;
          margin: 0;
          display: inline-block;
        }
        img {
          width: 100%;
          padding: 5px;
          border: 1px  solid #ccc;
          box-shadow: 0 0 8px #ccc; // 阴影
        }
      }
    }
  }
</style>
```

## 12、商品列表页面

![image-20181130142443306](https://ws1.sinaimg.cn/large/006tNbRwly1fxq2k1esfsj30jk0xkwmp.jpg)

```vue
<template>
    <div class="goodslist-container">
      <div class="goods-item">
        <img src="https://m.360buyimg.com/babel/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg">
        <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥899</span>
            <span class="old">￥999</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </div>
      <div class="goods-item">
        <img src="https://m.360buyimg.com/babel/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg">
        <h1 class="title">Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥899</span>
            <span class="old">￥999</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </div>
      <div class="goods-item">
        <img src="https://m.360buyimg.com/babel/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg">
        <h1 class="title">Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥899</span>
            <span class="old">￥999</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "goods-list"
    }
</script>

<style scoped lang="scss">
  .goodslist-container {
    display: flex;
    justify-content: space-between; // 两边靠边对齐
    flex-wrap: wrap;  // 配合下面的width: 49%
    padding: 5px;
    .goods-item {
      width: 49%;
      display: flex;
      flex-direction: column;
      justify-content: space-between; // 防止文字行数过多，撑大
      min-height: 293px;  // 给定一个最小高度
      border: 1px solid #ccc; // 边框
      box-shadow: 0 0 8px #ccc; // 虚化效果
      margin-bottom: 3px;
      img {
        width: 100%;
      }
    }
    h1 {
      font-size: 18px;
    }
    .info {
      background-color: #ccc;
      .now {
        color: red;
        font-weight: bold;  // 加粗
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;  // 删除线
        font-size: 12px;
        margin-left: 10px;
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
</style>
```

## 13、在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证 手机 和 开发项目的电脑 处于同一个 WIFI 环境中，也就是说 手机 可以 访问到 电脑的 IP
3. 打开自己的 项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令， 把 当前 电脑的 WIFI IP地址， 设置为 --host 的指令值；

 + 如何查看自己电脑所处 WIFI 的IP呢， 在 cmd 终端中运行 `ipconfig` ， 查看 无线网的 ip 地址

## 14、新的跳转路由的方式

```js
// 记得要绑定事件

methods: {
  goDetail(id) {
    // 使用JS的形式进行路由导航

    // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
    // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
    // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退（go）、 跳转到新的 URL 地址

    console.log(this);
    // 1. 最简单的
    // this.$router.push("/home/goodsinfo/" + id);
    // 2. 传递对象
    // this.$router.push({ path: "/home/goodsinfo/" + id });
    // 3. 传递命名的路由
    this.$router.push({ name: "GoodsInfo", params: { id } });
  }
}
```

### 15、抽取轮播图组件

![image-20181130145538132](https://ws3.sinaimg.cn/large/006tNbRwly1fxq3g7b9l8j30v80u0wm7.jpg)

使用时传递这个参数即可

![image-20181130145608649](https://ws4.sinaimg.cn/large/006tNbRwly1fxq3guh9ysj313g096dhj.jpg)

## 15、商品详情页面

![image-20181130160806095](https://ws1.sinaimg.cn/large/006tNbRwly1fxq5jm6310j30jk0xq793.jpg)

使用[vant步进器组件](https://youzan.github.io/vant/#/zh-CN/stepper)

```vue
<template>
    <div class="goodsinfo-container">
      <!-- 商品轮播图区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <swiper :lunbotuList="lunbotuList" :is-full="false"></swiper>
          </div>
        </div>
      </div>


      <!-- 商品购买区域 -->
      <div class="mui-card">
        <div class="mui-card-header">{{ goodsinfo.title }}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
            </p>
            <div class="stepper">购买数量：<van-stepper v-model="selectedCount" /></div>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>


      <!-- 商品参数区域 -->
      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{ goodsinfo.goods_no }}</p>
            <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
            <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain>图文介绍</mt-button>
          <mt-button type="danger" size="large" plain >商品评论</mt-button>
        </div>
      </div>

      <!--goodsinfo: {goods_no:12343434,stock_quantity:999,add_time:2018-02-06 11:23:22}-->
    </div>
</template>

<script>

    import swiper from "../subcomponents/Swiper"

    export default {
        name: "goods-info",
        data(){
          return {
            id: this.$route.id,
            lunbotuList: [
              {
                img: "https://img10.360buyimg.com/n1/s450x450_jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg",
                url: "xxx"
              },
              {
                img: "https://img10.360buyimg.com/n1/s450x450_jfs/t10639/290/1648891820/31320/2f39ac90/59e42830Ndf5e6577.jpg",
                url: "yyy"
              },
              {
                img: "https://img10.360buyimg.com/n1/s450x450_jfs/t9787/309/1633930906/65379/8fb80cc0/59e42831N83d658b3.jpg",
                url: "zzz"
              }
            ],
            goodsinfo: {goods_no:12343434,title:'Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机','market_price':'6999',sell_price:'6999',stock_quantity:'999',add_time:'2018-02-06 11:23:22'},
            selectedCount: 1, // 保存用户选中的商品数量， 默认，认为用户买1个
          }
        },
        components: {
          swiper
        },
        methods: {
          // getSelectedCount(count) {
          //   // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
          //   this.selectedCount = count;
          //   console.log("父组件拿到的数量值为： " + this.selectedCount);
          // }
        },
    }
</script>

<style scoped lang="scss">
  .goodsinfo-container {
    background-color: #eee;
    overflow: hidden;

    .now_price {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }

    .mui-card-footer {
      padding: 0 5px;
      display: block;
      button {
        margin: 5px 0;
      }
    }
  }
</style>

<!--修改步进器样式-->
<style lang="scss">
  .goodsinfo-container {
    .stepper {
      display: flex;
      justify-content: flex-start;
      text-align: left;
      margin: 5px 0;
      .van-stepper {
        display: flex;
        justify-content: space-between;
        width: 110px;
        height: 22px;
        .van-stepper__input {
          margin: 0;
          padding: 0;
          height: 20px;
        }
        button {
          height: 100%;
        }
      }
    }

  }
</style>
```

## 16、购物车小球动画

知识点：

- left和top的使用
- ref属性获取位置
- ref属性只能获取当前组件的位置，虽然vue不建议操作dom，但是原生js最容易，所以原生js获取购物车图标的位置

```vue
<!--加入购物车动画小球-->
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter">
  <div class="ball" v-show="ballFlag" ref="ball" ></div>	<!--注意ref属性-->
</transition>

<style>
  .goodsinfo-container {
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 390px; // 设置与最上边的距离（不论你怎么滑，里最上面都是这样的）
      left: 146px;  // 设置与最左边的距离
    }
  }
</style>


<script>
methods: {
    addCart(){
        // 商品添加到购物车
        this.$emit('func',this.selectedCount);

        this.ballFlag = !this.ballFlag;
    },
        beforeEnter(el) {
            const ballPosition = document.getElementsByClassName("van-stepper__input")[0].getBoundingClientRect();

            el.style.transform = "translate(0, 0)"; // 小球初始偏移量
        },
            enter(el, done) {
                el.offsetWidth;

                // 小球动画优化思路：
                // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
                // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
                // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
                // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
                // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

                // 获取小球的 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();

                // 获取 徽标 在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                console.log(badgePosition)

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
                afterEnter(el) {
                    this.ballFlag = !this.ballFlag;
                },
},
</script>
```

## 17、子组件向父组件传递值（实现toolbar端购物车数字的变化）

![image-20181130171720792](https://ws4.sinaimg.cn/large/006tNbRwly1fxq7jnyhbpj30o005uq3h.jpg)

![image-20181130171901594](https://ws1.sinaimg.cn/large/006tNbRwly1fxq7legvh7j30u00y0gua.jpg)

## 18、vuex的使用，添加购物车案例

Main.js

```js
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

      // 对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。

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

    }
  },
  getters: {
    getCount: function (state) {
      var num = 0;

      state.car.forEach(item => {
        num += item.count;
      });

      return num;
    }
  }
});
```

ShopInfo.vue在点击添加购物车时调用

```js
addCart(){
  // 商品添加到购物车
  this.$emit('func',this.selectedCount);

  this.ballFlag = !this.ballFlag;


  // 将商品数据加入store中
  // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
  var goodsinfo = {
    id: this.id,
    count: this.selectedCount,
    price: this.goodsinfo.sell_price,
    selected: true
  };
  // 调用 store 中的 mutations 来将商品加入购物车
  this.$store.commit("addToCar", goodsinfo);

},
```

废弃之前的向父组件传参，，提供getter方法

```vue
<router-link class="mui-tab-item" to="/shopcar">
    <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
     <span class="mui-badge" id="badge">{{ $store.getters.getCount }}</span>
    </span>
    <span class="mui-tab-label">购物车</span>
</router-link>
```

## 19、some方法的含义

  some方法：对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。

## 20、购物车页面（商品部分）实现

![image-20181201085003820](https://ws2.sinaimg.cn/large/006tNbRwgy1fxqyi651oaj30jq0yejvi.jpg)

```vue
<div class="shopcar-container">
  <div class="shopcar-list">

    <!-- 商品列表项区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">

          <mt-switch v-model="isSelected"></mt-switch>
          <img src="https://m.360buyimg.com/babel/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg">
          <div class="info">
            <h1>Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机</h1>


              <div class="stepper">
                <span class="price">￥6999.00</span>
                <van-stepper v-model="selectedCount" />
                <a href="#">删除</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped lang="scss">
  .shopcar-container{
    .mui-card-content-inner {

      display: flex;
      justify-content: space-between;
      align-items: center;  // 纵向居中

      img {
        height: 60px;
        width: 60px;
      }
      .info {

        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-between;*/

        h1 {
          font-size: 13px;
        }
        .price {
          color: red;
          font-weight: bold;
        }
      }

    }
  }

</style>

<style lang="scss">
  .shopcar-container {
    .stepper {
      display: flex;
      justify-content: space-between;
      /*justify-content: flex-start;*/
      text-align: left;
      margin: 5px 0;
      .van-stepper {
        display: flex;
        justify-content: space-between;
        width: 100px;
        height: 22px;
        .van-stepper__input {
          margin: 0;
          padding: 0;
          height: 20px;
        }
        button {
          height: 100%;
        }
      }
    }

  }
</style>
```

## 21、后退按钮实现

```vue
<div id="app">
    <!--顶部Header区域-->
    <mt-header title="鑫哥棒棒哒-Vue项目" fixed>
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    ...

<script>
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
  // 监视 路由 如果新的路由是 /home 则隐藏后退按钮
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  },
  // 上面有一个问题，就是在初始化的时候不会执行
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  }
</script>
```









