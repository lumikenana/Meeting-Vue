<template>
  <div class="default-back"><img src="../../static/bgimg2.jpg" alt=""></div>
</template>

<script>
  export default {
    name: 'defaultback',
  }
</script>

<style scoped>
  .default-back {
    position: relative;
    overflow: hidden;
    box-shadow: 10px 10px 20px 10px rgba(199, 198, 200, 255), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
  }
  .default-back img {
    height: 95vh;
    width: 100%;
    opacity: 20%;
  }
</style>
