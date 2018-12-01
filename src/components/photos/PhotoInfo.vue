<template>
    <div class="photoinfo-container">

      <!--标题区域-->
      <h1>标题</h1>
      <div class="sub-title">
        <span>发表时间：xxxxxxx</span>
        <span>点击xx次</span>
      </div>
      <hr/>


      <!--缩略图区域-->
      <div class="thumb-parent">
        <div class="thumbs">
          <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
      </div>

      <div class="content">图片内容</div>
      <!--评论子组件-->
      <cmt-box :id="id"></cmt-box>


    </div>
</template>

<script>

    import comment from "../subcomponents/Comment.vue"
    import CmtBox from "../subcomponents/Comment";

    export default {
      name: "photo-info",
      data () {
        return {

          id: this.$route.params.id,
          slide1: [
            {
              src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
              msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
              alt: 'picture1',
              title: 'Image Caption 1',
              w: 600,
              h: 400
            },{
              src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
              msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
              alt: 'picture1',
              title: 'Image Caption 1',
              w: 600,
              h: 400
            },
            {
              src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
              msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
              alt: 'picture2',
              title: 'Image Caption 2',
              w: 1200,
              h: 900
            },
            {
              src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
              msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
              alt: 'picture2',
              title: 'Image Caption 2',
              w: 1200,
              h: 900
            }
          ]
        }
      },
      methods: {
        handleClose () {
          console.log('close event')
        }
      },components: {
        // 注册 评论子组件
        CmtBox,
        "cmt-box": comment
      }
    }
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;
    h1 {
      font-size: 18px;
      margin: 8px 0;
      text-align: center;
    }
    .sub-title {
      color: #26a2ff;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin: 0 5px;
    }
    .content {
      font-size: 13px;
      line-height: 30px;
    }
  }
</style>

<style lang="scss">
  .photoinfo-container {
    .thumb-parent{
      .thumbs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between; // 靠两边对其
        margin: 10px;
        figure {
          width: 33%;
          margin: 0;
          display: inline-block;
        }
        img {
          width: 100%;
          padding: 5px;
          border: 1px  solid #ccc;
          box-shadow: 0 0 8px #ccc; // 阴影
        }
      }
    }
  }
</style>
