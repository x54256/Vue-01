<template>
  <div class="photo-list-container">

    <!--顶部滚动条-->
    <ly-tab v-if="items.length > 1" v-model="selectedId" :items="items" :options="options" v-on:func="getPicById">

    </ly-tab>


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



    <router-view>

    </router-view>
  </div>
</template>


<script>



  import {Toast} from "mint-ui";

  export default {
    data () {
      return {
        selectedId: 0,
        items: [
          {id:0,category:'全部'}
        ],
        options: {
          activeColor: '#1d98bd',
          labelKey: 'category'
        },
        list: []
      }
    },
    methods: {
      getAllCate() {
        this.$http.get("pictureCategory").then(result => {
          if (result.status === 200) {
            // 如果没有失败，应该把数据保存到 data 上
            this.items = this.items.concat(result.data);
            console.log(result)
          } else {
            Toast("获取图片分类失败！");
          }
        })
      },
      getPicById(id) {
        this.$http.get("picture?id=" + id).then(result => {
          if (result.status === 200) {
            // 如果没有失败，应该把数据保存到 data 上
            this.list = result.data;
            console.log(result)
            Toast("获取图片成功！" + id);
          } else {
            Toast("获取图片失败！");
          }
        })
      }
    },
    mounted() {
      this.getAllCate();
      this.getPicById(0);
    },
  }
</script>

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

