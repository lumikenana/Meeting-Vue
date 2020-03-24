<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Meets :disabled="false" v-if="isRouterAlive"></Meets>
  </div>
</template>

<script>
  export default {
    name: "checkMeetTable",
    provide(){
      return {
        reload:this.reload,
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true))
      },
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit('openLoading');
      if (to.params.index.split('_')[0] === '1') {
        this.reload();
        next();
      } else {
        next();
      }
    },

  }
</script>

<style scoped>

</style>
