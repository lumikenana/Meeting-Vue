<template>
  <div class="per-manage">
    <router-view></router-view>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="会议室管理" name="first">
        <!-- <div class="left-box"> -->
        <el-table
          :data="roomdata.filter(data => !search || data.roomname.toLowerCase().includes(search.toLowerCase()) || data.level.toLowerCase().includes(search.toLowerCase()))"
          stripe
          style="width: 100%;"
          max-height="563px"
        >
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column label="" width="100"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="roomname" label="会议室名称" width="200"></el-table-column>
          <el-table-column prop="level" label="会议室等级" width="600"></el-table-column>
          <el-table-column fixed="right" label="" width="320">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="EditHandle(scope.$index, scope.row, 'EditRoom')">Edit</el-button>
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-info"
                iconColor="red"
                title="确定要删除本条吗？"
                @onConfirm="leftConfirm(scope.$index, scope.row)"
                @onCancel="cancel"
              >
                <el-button slot="reference" size="mini" type="danger" @click="Deletehandle(scope.$index, scope.row)">
                  Delete
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div style="position: absolute;bottom: 20px;left: 20px;"><el-button @click="toggleSelection()">取消选择</el-button></div> -->
        <!-- </div> -->
        <div style="margin-top: 15px;">
          <el-button @click="adddata('EditRoom')">添加会议室</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="部门管理" name="second">
        <!-- <div class="mid-btn"></div> -->
        <!-- <div class="right-box"> -->
        <el-table
          :data="departdata.filter(data => !search || data.departname.toLowerCase().includes(search.toLowerCase()))"
          stripe style="width: 100%" max-height="563px">
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column label="" width="100"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="departname" label="部门名称" width="900"></el-table-column>
          <el-table-column fixed="right" label="" width="320">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="EditHandle(scope.$index, scope.row, 'EditDepart')">Edit</el-button>
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-info"
                iconColor="red"
                title="确定要删除本条吗？"
                @onConfirm="rightConfirm(scope.$index, scope.row)"
                @onCancel="cancel"
              >
                <el-button slot="reference" size="mini" type="danger" @click="Deletehandle(scope.$index, scope.row)">
                  Delete
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div style="position: absolute;bottom: 20px;left: 20px;"><el-button @click="toggleSelection()">取消选择</el-button></div> -->
        <!-- </div> -->
        <div style="margin-top: 15px;">
          <el-button @click="adddata('EditDepart')">添加部门</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时间管理" name="third">
        <el-table
          :data="datedata"
          stripe
          style="width: 100%;"
          max-height="563px"
        >
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column label="" width="100"></el-table-column>
          <el-table-column type="index" label="" width="80"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="140"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="680"></el-table-column>
          <el-table-column fixed="right" label="" width="320">
            <template slot-scope="scope">
              <el-button class="date-btn" size="mini" @click="InsertHandle(scope.$index, scope.row, 'EditDate')"
                         type="primary">Insert
              </el-button>
              <el-button class="date-btn" size="mini" @click="EditHandle(scope.$index, scope.row, 'EditDate')">Edit
              </el-button>
              <el-popconfirm
                confirmButtonText="好的"
                cancelButtonText="不用了"
                icon="el-icon-info"
                iconColor="red"
                title="确定要删除本条吗？"
                @onConfirm="dateConfirm(scope.$index, scope.row)"
                @onCancel="cancel"
              >
                <el-button class="date-btn" slot="reference" size="mini" type="danger"
                           @click="Deletehandle(scope.$index, scope.row)">Delete
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 15px;">
          <el-button @click="adddata('EditDate')">添加时间</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Meeting',
    data() {
      return {
        roomdata: [],
        departdata: [],
        datedata: [],
        search: '',
        activeName: this.$store.getters.activeName,
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        this.$store.dispatch('commitActiveName', tab.name);
      },
      getdate() {
        // 从服务器获取时间信息
        this.$axios.get('base/getdate')
          .then(res => {
            // console.log(res);
            this.datedata = res.data.message;
          })
          .catch(err => {
            console.log(err);
          });
      },
      getrooms() {
        // 从服务器获取会议室信息
        this.$axios.get('room/getroom')
          .then(res => {
            this.roomdata = res.data.message;
          })
          .catch(err => {
            console.log(err);
          });
      },
      getdepart() {
        // 从服务器获取部门信息
        this.$axios.get('base/getdepart')
          .then(res => {
            this.departdata = res.data.message;
            // console.log(this.departdata);
          })
          .catch(err => {
            console.log(err);
          });
      },
      adddata(route) {
        this.$store.dispatch('commitData', {});
        this.$store.dispatch('commitStatus', 'add');
        this.$router.push({name: route});
      },
      EditHandle(index, data, route) {
        this.$store.dispatch('commitData', data);
        this.$store.dispatch('commitStatus', 'update');
        this.$router.push({name: route});
      },
      Deletehandle(index, data) {
        // 删除按钮事件
      },
      leftConfirm(index, data) {
        this.delroom(data.roomid);
        this.getrooms();
      },
      dateConfirm(index, data) {
        this.deldate(data.id);
        this.getdate();
      },
      rightConfirm(index, data) {
        this.deldepart(data.id);
        this.getdepart();
      },
      cancel() {
        console.log('cancel');
      },
      toggleSelection(rows) {
        // 多选功能实现
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.$store.dispatch('commitSelection', val);
        this.multipleSelection = this.$store.getters.multipleSelection;
      },
      deldepart(id) {
        // delete depart
        this.$axios
          .get(`base/del-depart/` + id)
          .then(res => {
            if (res.data.status) {
              // const h = this.$createElement;
              this.$notify.error({
                title: '错误',
                message: '当前部门正在使用，无法删除'
              });
            } else {
              this.$notify.error({
                title: '成功',
                message: '部门信息删除成功',
                type: 'success'
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      delroom(id) {
        // delete room
        this.$axios
          .get(`room/del-room/` + id)
          .then(res => {
            this.$notify.error({
              title: '成功',
              message: '会议室删除成功',
              type: 'success'
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      deldate(id) {
        // delete date
        this.$axios
          .get('base/del-date/' + id)
          .then(res => {
            this.$notify.error({
              title: '成功',
              message: '会议室删除成功',
              type: 'success'
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      InsertHandle(index, data, route) {
        this.$store.dispatch('commitData', data);
        this.$store.dispatch('commitStatus', 'insert');
        this.$router.push({name: route});
      }
    },
    created() {
      this.getdepart();
      this.getrooms();
      this.getdate();
    },
    beforeRouteUpdate(to, from, next) {
      if (to.name === 'Meeting') {
        this.getrooms();
        this.getdate();
        this.getdepart();
        next();
      } else {
        next();
      }
    }
  };
</script>

<style scoped>
  .per-manage {
    height: 688px;
    margin: 100px 50px 50px 50px;
    position: relative;
    overflow: hidden;
  }

  .el-button {
    width: 100px;
    margin: 0 0;
  }

  .date-btn {
    width: 80px;
    margin: 0 0;
  }
</style>
