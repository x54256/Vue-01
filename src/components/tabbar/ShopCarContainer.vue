<template>
  <div class="shopcar-container">
    <div class="shopcar-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in $store.getters.getCar" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">

            <mt-switch v-model="item.selected" @change="selectedChanged(item.id,item.selected)"></mt-switch>
            <img src="https://m.360buyimg.com/babel/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg!q70.jpg">
            <div class="info">
              <h1>Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机</h1>
              <div class="stepper">
                <span class="price">￥{{ item.price }}</span>
                <van-stepper v-model="item.count" @change="updateItemNum(item.id,item.count)"/>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getSeleectNumAndPrice.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getSeleectNumAndPrice.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shop-car-container.vue",
        data(){
          return {
          }
        },
        methods: {
          updateItemNum(id,count){
            this.$store.commit("updateItemNum", {id:id,count:count});
          },
          remove(id,index){
            // 由于我直接拿的是store中的数据，所以索引没有用
            this.$store.commit("removeItem", id);
          },
          selectedChanged(id,selected){
            console.log(selected)
          },

        }
    }
</script>

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

    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
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
