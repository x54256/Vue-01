<template>

  <div>
    <!-- 轮播图区域 -->
    <!--<mt-swipe :auto="4000">-->
      <!--&lt;!&ndash;在组件中，使用v-for循环的话，一定要使用 key &ndash;&gt;-->
      <!--<mt-swipe-item v-for="item in lunbotuList" :key="item.url">-->
        <!--<img :src="item.img" alt="">-->
      <!--</mt-swipe-item>-->
    <!--</mt-swipe>-->

    <swiper :lunbotuList="lunbotuList" is-full="true"></swiper>

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
        <img src="../../images/menu1.png" alt="">
        <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
        <img src="../../images/menu2.png" alt="">
        <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
        <img src="../../images/menu3.png" alt="">
        <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu5.png" alt="">
        <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div></a></li>
    </ul>


  </div>


</template>

<script>

  import {Toast} from "mint-ui";
  import swiper from "../subcomponents/Swiper"

  export default {
    name: "home-container",
    data() {
      return {
        // 假数据
        lunbotuList: [
          {
            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=618052011,155537526&fm=26&gp=0.jpg",
            url: "xxx"
          },
          {
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543334067899&di=99c373b5aa921c1a95796fa7d4cb7c9e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F2c9274b98572f102655eff83f22ad67d9022df081429a-UMoqD6_fw658",
            url: "yyy"
          }
        ]
      }
    },
    methods: {
      //   getLunbotu() {
      //     // 获取轮播图数据的方法
      //     this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
      //       if (result.body.status === 0) {
      //         // 成功了
      //         this.lunbotuList = result.body.message;
      //       } else {
      //         // 失败的
      //         Toast("加载轮播图失败。。。");
      //       }
      //     }, reason => {
      //       Toast("加载轮播图失败。。。");
      //     });
      //   }
      // },
      // created() {
      //   this.getLunbotu()
      },
    components: {
      swiper
    }

  }
</script>

<style scoped lang="scss">


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
