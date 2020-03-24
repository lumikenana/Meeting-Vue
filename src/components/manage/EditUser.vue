<template>
  <div class="edit-user" v-if="isedit">
    <div class="edit-box">
      <div class="edit-title" style="text-align: center;">
        <h2>{{ title }}</h2>
      </div>
      <div class="content">
        <el-alert title="错误提示的文案" type="error" v-if="showmsg"></el-alert>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">用户名</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content"><el-input v-model="userInfo.username" type="text" placeholder="请输入用户名"></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">部门</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content">
              <el-select v-model="userInfo.depart" filterable placeholder="请选择部门">
                <el-option v-for="item in options" :key="item.id" :label="item.departname" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">邮箱</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content"><el-input v-model="userInfo.email" type="email" placeholder="请输入用户邮箱地址"></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">电话</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content"><el-input v-model="userInfo.telephone" type="email" placeholder="请输入用户联系方式"></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">菜单权限</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content">
              <el-select v-model="userInfo.menus" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in menus" :key="item.id" :label="item.menuname" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 40px;">
          <el-col :span="12">
            <div class="grid-content left-btn"><el-button type="primary" @click="cancelHandle">取消</el-button></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content right-btn"><el-button type="success" plain @click="saveHandle">保存</el-button></div>
          </el-col>
        </el-row>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" :modal="false" center>
          <span>数据尚未保存，确定要退出吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  data() {
    return {
      userInfo: {},
      isupdate: false,
      options: {},
      menus: {},
      centerDialogVisible: false,
      showmsg: false,
      data: this.$store.getters.data
    };
  },
  props: ['isedit'],
  computed: {
    title() {
      if (this.data.username) {
        return '修改用户信息';
      } else {
        return '添加用户';
      }
    }
  },
  // props: ['isedit', 'data'],
  methods: {
    getDepart() {
      this.$axios
        .get('base/getdepart')
        .then(res => {
          this.options = res.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllMenus() {
      this.$axios
        .get('base/getmenus')
        .then(res => {
          this.menus = res.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveHandle() {
      this.isupdate ? this.updateHandle() : this.addHandle();
    },
    addHandle() {
      this.$axios
        .post('account/add-user', this.userInfo)
        .then(res => {
          if (res.data.status) {
            console.log(res.data.message);
          } else {
            this.$router.push({ name: 'Personnel' });
            this.userInfo = {};
            const h = this.$createElement;
            this.$notify({
              title: '提示',
              message: h('i', { style: 'color: teal' }, '用户信息添加成功')
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateHandle() {
      this.$axios
        .post('account/update-user', this.userInfo)
        .then(res => {
          if (res.data.status) {
            console.log(res.data.message);
          } else {
            this.$router.push({ name: 'Personnel' });
            this.userInfo = {};
            const h = this.$createElement;
            this.$notify({
              title: '提示',
              message: h('i', { style: 'color: teal' }, '用户信息更新成功')
            });
          }
          this.isupdate = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelHandle() {
      if (this.userInfo.username || this.userInfo.email || this.userInfo.telephone || this.userInfo.depart || this.userInfo.menus.length !== 0) {
        this.centerDialogVisible = true;
      } else {
        this.$router.push({ name: 'Personnel' });
      }
    },
    confirm() {
      this.centerDialogVisible = false;
      this.$router.push({ name: 'Personnel' });
    }
  },
  created() {
    this.getDepart();
    this.getAllMenus();
    this.userInfo = this.data;
    if (this.data.username) {
      this.isupdate = true;
    }
  }
};
</script>

<style scoped>
.edit-user {
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6) !important;
  background: #000;
  filter: Alpha(opacity=60);
}
.edit-user .edit-box {
  width: 500px;
  height: 550px;
  position: relative;
  margin-top: -300px;
  margin-left: -250px;
  top: 50%;
  left: 50%;
  border: 1px solid #333333;
  background-color: #ebebf5;
  border-radius: 10px;
}
.edit-user .left-title {
  float: right;
  margin-right: 0.3125rem;
  line-height: 40px;
}
.edit-user .right-content {
  float: left;
  width: 70%;
  margin-left: 10px;
}
.edit-user .left-btn {
  float: right;
  margin-right: 3.3125rem;
}
.edit-user .right-btn {
  float: left;
  margin-left: 3.3125rem;
}
.edit-user .edit-title h2 {
  margin: 40px 0;
}
.edit-user .content .el-dialog {
  /* background-color: #ebebf5; */
  border-radius: 10px;
}
</style>
