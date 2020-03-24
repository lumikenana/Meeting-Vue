<template>
  <div class="edit-room" v-if="isedit">
    <div class="edit-box">
      <div class="edit-title" style="text-align: center;">
        <h2>{{ title }}</h2>
      </div>
      <div class="content">
        <el-alert title="错误提示的文案" type="error" v-if="false"></el-alert>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">会议室名称</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content"><el-input v-model="roomList.roomname" type="text" placeholder="请输入会议室名称"></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><div class="grid-content left-title">会议室级别</div></el-col>
          <el-col :span="18">
            <div class="grid-content right-content">
              <el-select v-model="roomList.level" filterable placeholder="请选择会议室级别">
                <el-option v-for="item in options" :key="item.id" :label="item.level" :value="item.id"></el-option>
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
  name: 'EditRoom',
  data() {
    return {
      isupdate: false,
      roomList: {},
      options: [],
      data: this.$store.getters.data,
      centerDialogVisible: false
    };
  },
  props:['isedit'],
  computed: {
    title() {
      if (this.data.roomname) {
        return '修改会议室信息';
      } else {
        return '添加会议室';
      }
    }
  },
  methods: {
    getLevel() {
      this.$axios
        .get('base/level')
        .then(res => {
          this.options = res.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelHandle() {
      if (this.roomList.roomname || this.roomList.level) {
        this.centerDialogVisible = true;
      } else {
        this.$router.push({ name: 'Meeting' });
      }
    },
    saveHandle() {
      this.isupdate ? this.updatehandle() : this.addHandle();
    },
    addHandle() {
      this.$axios.post('room/add-room', this.roomList)
      .then(res=>{
        this.$router.push({ name: 'Meeting' });
        this.userInfo = {};
        // const h = this.$createElement;
        this.$notify({
          title: '成功',
          message: '会议室添加成功',
          type: 'success'
        });
      })
      .catch(err=>{
        console.log(err);
      })
    },
    updatehandle() {
      this.$axios.post('room/update-room', this.roomList)
      .then(res=>{
        this.$router.push({ name: 'Meeting' });
        this.userInfo = {};
        // const h = this.$createElement;
        this.$notify({
          title: '成功',
          message: '会议室修改成功',
          type: 'success'
        });
      })
      .catch(err=>{
        console.log(err);
      })
    },
    confirm() {
      this.centerDialogVisible = false;
      this.$router.push({ name: 'Meeting' });
    }
  },
  created() {
    this.getLevel();
    this.roomList = this.data;
    if (this.data.roomname) {
      this.isupdate = true;
    }
  }
};
</script>

<style scoped>
.edit-room {
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
.edit-room .edit-box {
  width: 500px;
  height: 350px;
  position: relative;
  margin-top: -200px;
  margin-left: -250px;
  top: 50%;
  left: 50%;
  border: 1px solid #333333;
  background-color: #ebebf5;
  border-radius: 10px;
}
.edit-room .left-title {
  float: right;
  margin-right: 0.3125rem;
  line-height: 40px;
}
.edit-room .right-content {
  float: left;
  width: 70%;
  margin-left: 10px;
}
.edit-room .left-btn {
  float: right;
  margin-right: 3.3125rem;
}
.edit-room .right-btn {
  float: left;
  margin-left: 3.3125rem;
}
.edit-room .edit-title h2 {
  margin: 40px 0;
}
.edit-room .content .el-dialog {
  /* background-color: #ebebf5; */
  border-radius: 10px;
}
</style>
