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
