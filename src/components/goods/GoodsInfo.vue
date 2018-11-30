<template>
    <div class="goodsinfo-container">

      <!--加入购物车动画小球-->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball" ></div>
      </transition>

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
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
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
            id: this.$route.params.id,
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
            ballFlag: false, // 小球是否显示
          }
        },
        components: {
          swiper
        },
        methods: {
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

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
          },
          afterEnter(el) {
            this.ballFlag = !this.ballFlag;
          },
          goDesc(id){
            this.$router.push({ name: "GoodsDesc", params: { id } });
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
