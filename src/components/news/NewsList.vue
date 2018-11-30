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
