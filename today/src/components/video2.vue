<!-- City -->
<link
  href="https://unpkg.com/@videojs/themes@1/dist/city/index.css"
  rel="stylesheet"
/>
<template>
  <div class="vjs-theme-city">
    <video
      id="myVideo"
      class="video-js"
    >
      <source
        src=""
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: "TestTwo",
    data() {
      return {};
    },
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "false",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "800px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "400px",
          //设置封面
          poster:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4149371469,3281998313&fm=26&gp=0.jpg"
        });
      }
    }
  };
</script>

<style scoped>
</style>
