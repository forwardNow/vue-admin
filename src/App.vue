<template>
  <div class="app">
    <transition mode="out-in" name="admin">
      <router-view></router-view>
    </transition>

    <!-- 全局 loading -->
    <div class="loading" v-show="isVisible">
      <span class="el-icon-loading"></span>
      <span>{{ url }}</span>
    </div>
    <!-- /全局 loading -->

  </div>
</template>
<script>
export default {
  computed: {
    isVisible() {
      return this.$store.state.isLoading;
    },
    url() {
      return this.$store.state.currentUrl;
    },
  },
};
</script>
<style scoped>

.app {
  height: 100%;
}

.loading {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 400px;
  height: 20px;
  line-height: 16px;
  font-size: 12px;
  color: #333;
  border: solid 1px #c5c6c7;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 3px;
}
</style>

