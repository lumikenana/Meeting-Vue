<template>
  <div class="aside">
    <el-row class="tac">
      <!-- <el-col :span="12"> -->
      <!-- <h5>会议室管理</h5> -->
      <el-menu default-active="/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu v-for="(item) in menuList" :key="item.id" :index="item.id.toString()">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.menuname }}</span>
          </template>
          <checkRoom :menuindex='item.id'></checkRoom>
          <bookRoom :menuindex='item.id'></bookRoom>
          <manageRoom :menuindex='item.id'></manageRoom>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import checkRoom from '@/components/asideCom/checkRoom';
import manageRoom from '@/components/asideCom/manageRoom';
import bookRoom from '@/components/asideCom/bookRoom';
export default {
  name: 'Aside',
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    getmenus() {
      this.$axios
        .post('base/menus', {
          username: this.$store.getters.username
        })
        .then(res => {
          this.menuList = res.data.message;
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getmenus();
  },
  components: {
    checkRoom,
    manageRoom,
    bookRoom,
  },
};
</script>

<style>
.tac {
  height: calc(100%-60px);
}
</style>
