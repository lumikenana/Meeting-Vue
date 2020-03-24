<template>
  <div class="head-user">
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <div class="logo"><img src="../assets/meetlogo.png" alt="meeting-system" /></div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light"><div class="systeminfo">欢迎使用会议室预定系统</div></div>
    </el-col>
    <el-col :span="7">
      <div class="grid-content bg-purple">
        <div class="user">
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light" style="height: 90px;">
                <el-dropdown @command="commandHandle">
                  <div class="el-dropdown-link">
                    <span>{{ username }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='a'>设置</el-dropdown-item>
                    <el-dropdown-item command='b'>消息</el-dropdown-item>
                    <el-dropdown-item command='c' divided>切换账号</el-dropdown-item>
                    <el-dropdown-item command='d' divided>注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {
      // UserName: this.$store.getters.username,
    };
  },
  computed: {
    username() {
      // console.log('4:', this.$store.getters.username);
      return this.$store.getters.username;
    }
  },
  methods: {
    logoutHandle() {
      // console.log('开始注销');
      window.localStorage.removeItem('token');
      // console.log('注销结束');
      this.$store.commit('username');
      this.$router.push('/login');
    },
    commandHandle(command) {
      // console.log(command);
      if (command == 'd') {
        this.logoutHandle();
      }
    }
  },
  created() {
    // this.UserName = this.$store.getters.username;
    // this.UserName = localStorage.getItem('token') ? localStorage.getItem('token') : '未登录';
  }
};
</script>

<style>
.head-user {
  width: 100%;
  height: 5.625rem;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  /* border-radius: 4px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #99a9bf;
}
.bg-purple-light {
  background: #99a9bf;
  text-align: center;
}
.head-user .grid-content {
  /* border-radius: 4px; */
  min-height: 3.75rem;
  position: relative;
}
.logo {
  width: 3.125rem;
  height: 3.125rem;
  margin-top: 1.25rem;
  margin-left: 6.25rem;
  position: absolute;
}
.systeminfo {
  height: 100%;
  overflow: auto;
  line-height: 5.625rem;
  font-size: 2.5rem;
}
.logo img {
  width: 50px;
}
.user {
  /* height: 100%; */
  width: 18.75rem;
}
/* .user .user-img {
  padding-top: 1.25rem;
} */
.user .el-avatar {
  margin-top: 1.5625rem;
  position: absolute;
  /* float: right; */
  right: 0.3125rem;
}
.user .user-info {
  float: left;
  margin-left: 0.3125rem;
  line-height: 5.625rem;
}
.el-dropdown {
  width: 100px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #333;
  font-size: 1.25rem;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
