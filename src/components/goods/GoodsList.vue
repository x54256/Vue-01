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
      <div class="goods-item" @click="goDetail(123)">
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

      <!--<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>-->
    </div>
</template>

<script>
    export default {
        name: "goods-list",
        data() {
          return {}
        },
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
