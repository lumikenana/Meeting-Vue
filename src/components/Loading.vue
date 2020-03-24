<template>
  <div class="loading">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
  }
</script>

<style scoped>
  .loading {
    float: left;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1005;
    background: rgba(248, 248, 248, 153) !important;
    background: #f8f8f8;
    opacity: 0.7;
    /* filter: Alpha(opacity=0.7); */
  }
  .loading i {
    position: absolute;
    z-index: 1006;
    top: 40%;
    left: 50%;
    margin-top: -8px;
    margin-left: -8px;
  }
</style>
