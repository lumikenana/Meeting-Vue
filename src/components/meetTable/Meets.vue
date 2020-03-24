<template>
  <div class="meets">
    <div class="select-tables">
      <div class="go-ahead" @click="goAhead"><i class="el-icon-caret-left"></i></div>
      <div class="go-back" @click="goBack"><i class="el-icon-caret-right"></i></div>
      <table class="table" cellspacing="0">
        <tr>
          <th v-for="(i, index) in weekList" :key="index">{{ i }}</th>
        </tr>
        <tr v-for="(it, Index) in dateList" :key="it.id">
          <el-tooltip class="item" effect="dark" :content="JumpMessage" :placement="getaddr(index+1, Index+1)"
                      v-for="(j, index) in weekList" :key="index" :disabled="disabled">
            <td @click="CollapseHandle(j, it)">
              <div class="booked-room" v-if="bookedStatus(j, it.id)">
                <i class="el-icon-error" style="right: 0;top: 0;position: absolute;" @click.stop="cancelMeet(j, it.id)" v-if="showManage"></i>
              </div>
              {{ it.startTime + '-' + it.endTime }}
            </td>
          </el-tooltip>
        </tr>
      </table>
      <div><el-button type="primary" style="float: right;margin-top: 10px;" @click='showManage = !showManage'>管理</el-button></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Meets',
    inject:["reload"],
    data() {
      return {
        weekList: [],
        defaultDateList: [
          {id: 1, startTime: '9:00', endTime: '10:00'},
          {id: 2, startTime: '10:00', endTime: '11:00'},
          {id: 3, startTime: '11:00', endTime: '12:00'},
          {id: 4, startTime: '12:00', endTime: '13:00'},
          {id: 5, startTime: '13:00', endTime: '14:00'},
          {id: 6, startTime: '14:00', endTime: '15:00'},
          {id: 7, startTime: '15:00', endTime: '16:00'},
          {id: 8, startTime: '16:00', endTime: '17:00'},
          {id: 9, startTime: '17:00', endTime: '18:00'},
          {id: 10, startTime: '18:00', endTime: '19:00'}
        ],
        dateList: {},
        JumpMessage: this.$store.getters.username,
        bookRoom: {},
        bookedRoom: [],
        showManage: false
      };
    },
    props: ['disabled'],
    methods: {
      goAhead() {
        const myDate = new Date();
        let tDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        if (this.weekList[0] !== tDate) {
          this.weekList.pop();
          this.weekList.splice(0, 0, this.getNextDate(this.weekList[0], -1));
        }
      },
      goBack() {
        this.weekList.shift();
        this.weekList.splice(6, 0, this.getNextDate(this.weekList[5], 1));
      },
      getWeek() {
        for (let i = 0; i < 7; i++) {
          this.weekList.push(this.fun_date(i));
        }
      },
      getRoomDate() {
        this.$axios
          .get('base/getdate')
          .then(res => {
            if (res.data.status) {
              this.dateList = this.defaultDateList;
            } else {
              this.dateList = res.data.message;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      getBookedRoom() {
        this.roomid = this.$route.params.index.split('_')[2];
        this.$axios.get('room/getbooked-room/'+this.roomid.toString())
          .then(res => {
            this.bookedRoom = res.data.message;
          })
          .catch(err => {
            console.log(err);
          })
      },
      bookedStatus(date, data) {
        for (let i=0;i<this.bookedRoom.length;i++) {
          if (this.bookedRoom[i].bookDate == date && this.bookedRoom[i].timeid == data) {
            return true;
          }
        }
      },
      CollapseHandle(date, data) {
        if (this.disabled) {
          this.bookRoom = {
            userName: this.$store.getters.username,
            roomId: this.$route.params.index.split('_')[2],
            timeId: data.id,
            date: date
          };
          this.$axios.post('room/booked-room', this.bookRoom)
            .then(res=>{
              if (res.data.status === 0) {
                this.$notify({
                  title: '成功',
                  message: '会议室预定成功',
                  type: 'success',
                  // duration: 0
                });
                this.refresh();
              } else if (res.data.status === 1) {
                this.$notify.error({
                  title: '失败',
                  message: '会议室该时段已被预订，请预订其他时间',
                  // duration: 0
                });
              }
            })
            .catch(err=>{
              console.log(err);
            })
        } else {
          //
        }
      },
      cancelMeet(date, data) {
        this.$axios.post('room/cancel_book', {
          'timeid': data,
          'date': date,
        })
        .then(res=>{
          console.log(res.data.message);
          this.$notify({
            title: '成功',
            message: '取消预定会议室成功',
            type: 'success',
            // duration: 0
          });
          this.refresh();
          this.showManage = true;
        })
        .catch(err=>{
          console.log(err);
        })
      },
      getaddr(num, data) {
        if (data > 5) {
          if (num <= 2) {
            return 'top-start';
          } else if (num > 2 && num <= 5) {
            return 'top';
          } else if (num > 5) {
            return 'top-end';
          }
        } else {
          if (num <= 2) {
            return 'bottom-start';
          } else if (num > 2 && num <= 5) {
            return 'bottom';
          } else if (num > 5) {
            return 'bottom-end';
          }
        }
      },
      fun_date(aa) {
        var date1 = new Date();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        return time2;
      },
      getNextDate(date, day) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        return y + "-" + m + "-" + d;
      },
      refresh() {
        this.reload();
      }
    },
    created() {
      this.getRoomDate();
      this.getWeek();
      this.getBookedRoom();
    },
    mounted() {
      this.$store.commit('closeLoading');
    }
    /*beforeCreate() {
      let that = this;
      setTimeout(()=>{
        that.getBookedRoom();
      }, 0)
    }*/
  }
</script>

<style>
  .meets {
    height: 688px;
    box-shadow: 10px 10px 20px 10px rgba(199, 198, 200, 255), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    margin: 100px 50px 50px 50px;
    position: relative;
  }

  .block {
    position: absolute;
    right: 200px;
    top: 10px;
  }

  .select-tables {
    position: absolute;
    margin-left: 6.25rem;
    margin-top: 70px;
  }

  .table {
    box-shadow: 5px 5px 10px 5px rgba(199, 198, 200, 255), -5px 5px 5px 5px rgba(255, 255, 255, 0.5);
    border: 1px solid #cecee6;
  }

  .table th {
    height: 30px;
  }

  .table td {
    border: 1px solid #d5d5df;
    width: 11rem;
    height: 48px;
    text-align: center;
    color: #99a9bf;
    position: relative;
  }

  .table td:hover {
    cursor: pointer;
    box-shadow: 5px 5px 10px 5px rgba(199, 198, 200, 255), -5px 5px 5px 5px rgba(255, 255, 255, 0.5);
    color: #333333;
  }

  .booked-room {
    background-color: #344c86;
    width: 90%;
    height: 90%;
    opacity: 0.7;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  /*.box {*/
    /*width: 400px;*/
  /*}*/

  /*.top {*/
    /*text-align: center;*/
  /*}*/

  /*.left {*/
    /*float: left;*/
    /*width: 60px;*/
  /*}*/

  /*.right {*/
    /*float: right;*/
    /*width: 60px;*/
  /*}*/

  /*.bottom {*/
    /*clear: both;*/
    /*text-align: center;*/
  /*}*/

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }

  .select-tables .go-ahead, .go-back {
    position: absolute;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }

  .go-ahead {
    left: 0;
  }

  .go-back {
    right: 0;
  }

</style>
