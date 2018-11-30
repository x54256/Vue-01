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
            <div class="stepper">购买数量：<van-stepper v-model="selectedCount" :max="goodsinfo.stock_quantity" /></div>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
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
          addCart(){
            this.$emit('func',this.selectedCount)
          }
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
