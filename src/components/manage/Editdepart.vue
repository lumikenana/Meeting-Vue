<template>
  <div class="edit-depart" v-if="isedit">
    <div class="edit-box">
      <div class="edit-title" style="text-align: center;">
        <h2>{{ title }}</h2>
      </div>
      <div class="content">
        <el-alert title="错误提示的文案" type="error" v-if="false"></el-alert>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">部门名称</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content"><el-input v-model="departList.departname" type="text" placeholder="请输入部门名称"></el-input></div>
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
  name: 'Editdepart',
  data() {
    return {
      departList: {},
      data: this.$store.getters.data,
      centerDialogVisible: false
    };
  },
  props: ['isedit'],
  computed: {
    title() {
      if (this.data.departname) {
        return '修改部门信息';
      } else {
        return '添加部门';
      }
    }
  },
  methods: {
    cancelHandle() {
      if (this.departList.departname) {
        this.centerDialogVisible = true;
      } else {
        this.$router.push({ name: 'Meeting' });
      }
    },
    saveHandle() {
      this.isupdate ? this.updateHandle() : this.addHandle();
    },
    addHandle() {
      this.$axios
        .post('base/add-depart', this.departList)
        .then(res => {
          this.$router.push({ name: 'Meeting' });
          this.departList = {};
          // const h = this.$createElement;
          this.$notify({
            title: '成功',
            message: '部门信息添加成功',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateHandle() {
      this.$axios
        .post('base/add-depart', this.departList)
        .then(res => {
          this.$router.push({ name: 'Meeting' });
          this.departList = {};
          // const h = this.$createElement;
          this.$notify({
            title: '成功',
            message: '部门信息更新成功',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirm() {
      this.$router.push({ name: 'Meeting' });
    },
  },
  created() {
    this.departList = this.data;
    if (this.data.departname) {
      this.isupdate = true;
    }
  }
};
</script>

<style scoped>
.edit-depart {
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.6) !important;
  background: #000;
  filter: Alpha(opacity=60);
}
.edit-depart .edit-box {
  width: 500px;
  height: 250px;
  position: relative;
  margin-top: -150px;
  margin-left: -250px;
  top: 50%;
  left: 50%;
  border: 1px solid #333333;
  background-color: #ebebf5;
  border-radius: 10px;
}
.edit-depart .left-title {
  float: right;
  margin-right: 0.3125rem;
  line-height: 40px;
}
.edit-depart .right-content {
  float: left;
  width: 70%;
  margin-left: 10px;
}
.edit-depart .left-btn {
  float: right;
  margin-right: 3.3125rem;
}
.edit-depart .right-btn {
  float: left;
  margin-left: 3.3125rem;
}
.edit-depart .edit-title h2 {
  margin: 40px 0;
}
.edit-depart .content .el-dialog {
  /* background-color: #ebebf5; */
  border-radius: 10px;
}
</style>
