<template>
  <div v-if="index === menuindex">
    <el-submenu :index="index.toString() + '_' + item.id.toString()" v-for="item in levels" :key="item.id">
      <template slot="title">
        {{ item.level }}
      </template>
      <el-menu-item
        :index="'/home/checkMeetTable/' + index.toString() + '_' + item.id.toString() + '_' + i.roomid.toString()" v-for="i in roomdata"
        :key="i.roomid" v-if="item.id === i.levelid">{{ i.roomname }}
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: 'checkRoom',
    data() {
      return {
        index: 1,
        levels: [],
        roomdata: this.$store.getters.roomList,
      };
    },
    props: ['menuindex'],
    methods: {
      getLevel() {
        this.$axios
          .get('base/level')
          .then(res => {
            this.levels = res.data.message;
          })
          .catch(err => {
            console.log(err);
          });
      },
      getrooms() {
        this.$axios
          .get('room/getroom')
          .then(res => {
            this.roomdata = res.data.message;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    created() {
      this.getrooms();
      this.getLevel();
    }
  };
</script>

<style scoped></style>
