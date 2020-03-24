<template>
  <div class="per-manage">
    <!-- <li v-for="user in usersList" :key="user.id">姓名:{{ user.username }} 邮箱:{{ user.email }} 电话:{{ user.telephone }} 部门:{{ user.departname }}</li> -->
    <el-table
      ref="multipleTable"
      :data="usersList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.departname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="600"
      :default-sort="{ prop: 'id', order: 'escending' }"
      @selection-change="handleSelectionChange"
      stripe
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <!-- <el-table-column fixed prop="id" label="id" width="100" sortable></el-table-column> -->
      <el-table-column prop="username" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="departname" label="部门" width="130" sortable></el-table-column>
      <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="strmenu" label="菜单权限" width="400"></el-table-column>
      <el-table-column fixed="right" label="" width="320">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定要删除本条吗？"
            @onConfirm="confirm(scope.$index, scope.row)"
            @onCancel="cancel"
          >
            <el-button slot="reference" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="isshow(scope.row)">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: absolute;bottom: 20px;left: 20px;"><el-button @click="toggleSelection()">取消选择</el-button></div>
    <div style="position: absolute;bottom: 20px;left: 140px;"><el-button @click="addUser()">添加用户</el-button></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Personnel',
  data() {
    return {
      usersList: [],
      search: '',
      multipleSelection: []
    };
  },
  methods: {
    getusers() {
      // 服务器获取用户信息
      this.$axios.get('account/users').then(res => {
        this.usersList = res.data.message;
      });
    },
    handleEdit(index, row) {
      // 编辑按钮事件
      this.$store.dispatch('commitData', row);
      this.$router.push({ name: 'EditUser' });
    },
    handleDelete(index, row) {
      // 删除按钮点击事件
      if (index === 0) {
        return null;
      } else {
        // console.log(row);
      }
      // console.log(index, row);
    },
    confirm(index, row) {
      // 删除提示框点击确认事件
      this.deluser(row.id);
      this.getusers();
    },
    cancel() {
      // 删除提示框点击取消事件
      console.log('cancel');
    },
    isshow(data) {
      // 返回bool值，决定是否显示删除按钮
      if (data.id == '1' || data.username == this.$store.getters.username) {
        // 用户不可以删除自己以及root用户
        return false;
      } else {
        return true;
      }
    },
    addUser() {
      // 跳转路由到增加用户页面
      this.$store.dispatch('commitData', {});
      this.$router.push({ name: 'EditUser' });
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
    deluser(id) {
      // 删除用户接口
      this.$axios
        .get('account/del-user/' + id.toString())
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getusers();
  },
  beforeRouteUpdate(to, from, next) {
    // 删除用户之后，重新获取用户信息
    if (to.name === 'Personnel') {
      this.getusers();
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
  box-shadow: 10px 10px 20px 10px rgba(199, 198, 200, 255), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  margin: 100px 50px 50px 50px;
  position: relative;
}
.el-button {
  width: 100px;
  margin: 0 0;
}
</style>
