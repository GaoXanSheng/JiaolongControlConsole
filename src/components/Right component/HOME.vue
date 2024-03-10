<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div class="title mdui-center">
      <div class="portrait mdui-img-circle svelte-uub0d8">
        <div class="add"><a target="_blank" href="https://github.com/GaoXanSheng/JiaolongControlConsole">
          <button class="mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple"
                  style="background-color: rgb(255, 64, 129);"><i class="mdui-icon material-icons">add</i></button>
        </a></div>
      </div>
      <h2 class="name">GaoXuSheng</h2>
    </div>
    <div class="mainDescription mdui-center">
      <h1>蛟龙16PRO工具箱</h1>
      <h3>该工具箱针对7945HX+4606版本进行开发，不保证其他版本可用，风险自负</h3>
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
.portrait {
  width: 100px;
  height: 100px;
  background-size: 100px;
  position: relative;
  margin: auto;
  top: 15%;
  background-image: url(https://yunmouren.top/assets/portrait-1f4162ef.jpg);
  .add {
    top: 75px;
    left: 75px;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50px;
  }
}
.name {
  text-align: center;
  padding-top: 60px
}

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
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-image: url(src/assets/background.jpg);
    background-size: cover;
    background-position: center;
  }
}
</style>