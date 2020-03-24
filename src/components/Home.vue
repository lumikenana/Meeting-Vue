<template>
  <div>
    <el-container>
      <el-aside width="300px"><Aside></Aside></el-aside>
      <el-main style="height: calc(100vh - 90px);">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  }
</script>

<style>
  .el-aside {
    background-color: #d3dce6;
  }
  .el-main {
    padding: 0;
  }
</style>
