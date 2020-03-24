<template>
  <div class="edit-date" v-if="isedit">
    <div class="edit-box">
      <div class="edit-title" style="text-align: center;">
        <h2>{{ title }}</h2>
      </div>
      <div class="content">
        <el-alert title="错误提示的文案" type="error" v-if="false"></el-alert>
        <el-row>
          <el-col :span="4"><div class="grid-content left-title">date</div></el-col>
          <el-col :span="20">
            <div class="grid-content right-content">
              <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                editable=editable
                size='medium'
                arrow-control=true
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '19:30'
                }"
              ></el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                editable=editable
                size='medium'
                arrow-control=true
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '19:30',
                  minTime: startTime
                }"
              ></el-time-select>
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
  name: 'EditDate',
  data() {
    return {
      isupdate: false,
      editable: false,
      dateList: {},
      data: this.$store.getters.data,
      centerDialogVisible: false,
      startTime: '',
      endTime: '',
    };
  },
  props: ['isedit'],
  computed: {
    title() {
      switch (this.$store.getters.getStatus) {
        case "update":
          return "更新时间信息";
        case "insert":
          return "插入时间信息";
        default:
          return "添加时间信息";
      }
    },
  },
  watch: {
    startTime: function(val, oldVal) {
      this.dateList.startTime = val;
    },
    endTime: function(val, oldVal) {
      this.dateList.endTime = val;
    }
  },
  methods: {
    cancelHandle() {
      if (this.dateList.time) {
        this.centerDialogVisible = true;
      } else {
        this.$router.push({ name: 'Meeting' });
      }
    },
    saveHandle() {
      switch (this.$store.getters.getStatus) {
        case "update":
          this.updatehandle();
          break;
        case "insert":
          this.insertHandle();
          break;
        default:
          this.addHandle();
      }
    },
    axiosGet(route, msg) {
      this.$axios
        .post(route, this.dateList)
        .then(res => {
          this.$router.push({ name: 'Meeting' });
          this.dateList = {};
          // const h = this.$createElement;
          this.$notify({
            title: '成功',
            message: msg,
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addHandle() {
      // 添加时间数据
      this.axiosGet('base/add-date', '时间添加成功');
    },
    updatehandle() {
      // 更新数据
      this.axiosGet('base/update-date', '时间修改成功');
    },
    insertHandle() {
      // 向上插入数据
      this.axiosGet('base/insert-date', '时间插入成功');
    },
    confirm() {
      this.centerDialogVisible = false;
      this.$router.push({ name: 'Meeting' });
    }
  },
  created() {
    this.dateList = this.data;
    this.startTime = this.dateList.startTime;
    this.endTime = this.dateList.endTime;
    if (this.$store.getters === 'update') {
      this.isupdate = true;
    }
  }
};
</script>

<style scoped>
.edit-date {
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
.edit-date .edit-box {
  width: 600px;
  height: 260px;
  position: relative;
  margin-top: -200px;
  margin-left: -300px;
  top: 50%;
  left: 50%;
  border: 1px solid #333333;
  background-color: #ebebf5;
  border-radius: 10px;
}
.edit-date .left-title {
  float: right;
  margin-right: 0.3125rem;
  line-height: 40px;
}
.edit-date .right-content {
  float: left;
  width: 100%;
  margin-left: 5px;
}
.edit-date .left-btn {
  float: right;
  margin-right: 3.3125rem;
}
.edit-date .right-btn {
  float: left;
  margin-left: 3.3125rem;
}
.edit-date .edit-title h2 {
  margin: 40px 0;
}
.edit-date .content .el-dialog {
  /* background-color: #ebebf5; */
  border-radius: 10px;
}
</style>
