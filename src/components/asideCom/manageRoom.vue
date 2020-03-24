<template>
  <div v-if="index == menuindex">
    <el-menu-item-group>
      <el-menu-item index="/home/personnel">人员管理</el-menu-item>
      <el-menu-item index="/home/meeting">其他管理</el-menu-item>
    </el-menu-item-group>
  </div>
</template>

<script>
  export default{
    name: 'manageRoom',
    data() {
      return {
        index: 3,
      }
    },
    props: ['menuindex'],
  }
</script>

<style>
  
</style>
