<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header height="90px">
        <Head></Head>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    methods: {
      saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state));
      },
    },
    mounted() {
      window.addEventListener('unload', this.saveState);
    },
  };
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    min-width: 1200px;
    min-height: 800px;
  }

  a {
    text-decoration: none;
    color: #333333;
  }

  li {
    list-style: none;
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-main {
    background-color: #e9eef3;
  }

  .el-header {
    background-color: #99a9bf;
    color: #333;
    text-align: center;
    line-height: 5.625rem;
    height: 5.625rem;
  }

  body > .el-container {
    /* margin-bottom: 40px; */
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
