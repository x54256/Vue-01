<template>

  <div class="cmt-container">
    <h3>发表评论</h3>

    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="content"></textarea>
    <mt-button class="cmt-btn" type="primary" size="large" @click="addComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(comment, i) in comments" :key="comment.add_time">
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
        pageIndex: 0,
        content: null // 评论
      }
    },
    created() {
      this.findCommentsByNewsId()
    },
    methods: {
      findCommentsByNewsId() {
        this.$http.get("comments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
          if (result.status === 200) {
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.data);

            console.log(result.data)
          } else {
            Toast("获取新闻" + this.id + "的评论失败！");
          }
        })
      },
      getMore() {
        this.pageIndex += 1;
        this.findCommentsByNewsId()
      },
      addComment() {

        if (this.content == null || this.content.trim().length === 0) {
          Toast("大哥，不要乱点好吧！");
          return
        }

        this.$http.post("/comments", {
          content: this.content,
          newsId: this.id
        }).then(result => {
          if (result.status === 200) {
            // 手动拼接一个对象加入列表中
            const time = Date.now();
            this.comments.unshift({
              userName: '匿名用户',
              addTime: time,
              content: this.content,
              newsId: this.id
            });
            Toast("评论发表成功！");
          }
        })
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
