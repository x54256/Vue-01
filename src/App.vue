<template>
  <div id="app">
    <!--顶部Header区域-->
    <mt-header title="鑫哥棒棒哒-Vue项目" fixed>
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>


    <!-- 中间路由router-view区域 -->
    <transition>
      <router-view v-on:func="addCartNum"/>
    </transition>
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
					<span class="mui-badge" id="badge">{{ $store.getters.getCount }}</span>
				</span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import {Toast} from "mint-ui";

export default {
  name: 'App',
  data() {
    return {
      flag: true
    }
  },
  methods: {
    addCartNum(num){
      this.cartNum += num;
      Toast("添加购物车成功！")
    },
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
}
</script>

<style lang="scss" scoped>
  #app{
    padding-top: 40px;
    padding-bottom: 50px;
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
