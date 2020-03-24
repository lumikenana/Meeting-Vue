<template>
  <el-container>
    <el-main>
      <div class="login">
        <div class="login-title">登录</div>
        <div class="err-message" v-if="msg">{{ msg }}</div>
        <el-row class="username-tab">
          <el-col :span="6"><div class="grid-content username">用户名</div></el-col>
          <el-col :span="18">
            <div class="grid-content">
              <label for=""><input type="text" placeholder=" 输入用户名" v-model="username" /></label>
            </div>
          </el-col>
        </el-row>
        <el-row class="pwd-tab">
          <el-col :span="6">
            <div class="grid-content pwd">
              <span>密</span>
              码
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content">
              <label for=""><input type="password" placeholder=" 输入密码" v-model="password" /></label>
            </div>
          </el-col>
        </el-row>
        <div class="save-login">
          <input type="checkbox" />
          七天内免登录
        </div>
        <div class="login-btn"><el-button type="primary" @click="loginHandle">登录</el-button></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      secretkey: 'abcdefghijklmnop',
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    commitUserinfo() {
      this.$axios
        .post('account/postuserinfo', {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.status == 1 || res.data.status == 2) {
            this.msg = res.data.message.err;
          } else {
            localStorage.setItem('token', JSON.stringify({ username: res.data.message.token }));
            this.$router.push('/home');
            this.$store.commit('username');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginHandle() {
      // let cryedPwd = this.$crypto.set(this.password, this.secretkey);
      // console.log(cryedPwd);
      this.commitUserinfo();
      // this.$router.push({ name: 'Index' });
      const redirect = this.$router.redirect;
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    }
  },
  created() {}
};
</script>

<style>
.login {
  width: 400px;
  height: 300px;
  position: fixed;
  left: 50%;
  right: 50%;
  margin-left: -200px;
  margin-top: 150px;
  text-align: center;
}
.err-message {
  position: absolute;
  color: #ff0000;
  font-size: 13px;
  top: 50px;
  left: 120px;
}
.login input::-webkit-input-placeholder {
  color: #99a9bf;
  font-size: 13px;
} /* 使用webkit内核的浏览器 */
.login input:-moz-placeholder {
  color: #99a9bf;
  font-size: 13px;
} /* Firefox版本4-18 */
.login input::-moz-placeholder {
  color: #99a9bf;
  font-size: 13px;
} /* Firefox版本19+ */
.login input:-ms-input-placeholder {
  color: #99a9bf;
  font-size: 13px;
} /* IE浏览器 */
.login-title {
  font-size: 30px;
  font-weight: bold;
}
.el-row {
  background-color: ;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.username-tab {
  margin-top: 2rem;
}
.username-tab .username {
  float: right;
  line-height: 30px;
}
.username-tab input {
  float: left;
  margin-left: 1.25rem;
  height: 28px;
  width: 250px;
}
.pwd-tab .pwd {
  float: right;
  line-height: 30px;
}
.pwd span {
  margin-right: 12px;
}
.pwd-tab input {
  float: left;
  margin-left: 1.25rem;
  height: 28px;
  width: 250px;
}
.save-login {
  position: absolute;
  top: 170px;
  left: 49px;
  font-size: 15px;
  color: #464634;
}
.login-btn .el-button {
  margin-top: 30px;
  width: 323px;
  margin-left: 22px;
  height: 40px;
}
</style>
