<script setup lang="ts">
// TODO 彩蛋
// 当电脑为 7945HX+4060+32GRAM 将HOME 的图片设置成视频播放
import BackgroundVideo from '../../assets/28、黑龙女孩 作者 SDL 彦程.mp4'
</script>

<template>
  <div class="home">
    <div class="title mdui-center">
      <video :src="BackgroundVideo" loop autoplay></video>
    </div>
    <div class="mainDescription mdui-center">
      <h1>蛟龙16PRO工具箱</h1>
      <h3>该工具箱针对7945HX+4060版本进行开发，不保证其他版本可用，风险自负</h3>
      <div class="mdui-typo">
        <blockquote>
          <p>Thaumaturgy... which giveth certain order to make strange works, of the sense to be perceived and of men greatly to be wondered at.MathematicallPraeface.</p>
          <footer>John Dee(1570) ——《Euclid's Elements》</footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<style scoped>

.home {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  .mainDescription{
    width: 600px;
  }
  .title {
    width: 600px;
    height: 300px;
    video{
      width: 600px;
      height: 300px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
}
</style>