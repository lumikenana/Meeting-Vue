<template>
  <Meets :disabled="true" v-if="isRouterAlive"></Meets>
  
</template>

<script>
  export default {
    name: "bookMeetTable",
    provide(){
      return {
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true))
      },
    },
    beforeRouteUpdate(to, from, next) {
      if (to.params.index.split('_')[0] === '2') {
        this.reload();
        next();
      } else {
        next();
      }
    }
  }
</script>

<style scoped>

</style>
