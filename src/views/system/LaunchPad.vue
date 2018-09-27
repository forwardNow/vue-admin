<template>
  <div class="sub-system-list">

    <div class="container clearfix">

        <div class="shortcut" @click="nav({name: 'system.userCenter'})">
          <div class="shortcut__icon">
            <span class="iconfont icon-quanjushezhi_o"></span>
          </div>
          <div class="shortcut__caption">系统管理子系统</div>
        </div>

        <div class="shortcut">
          <div class="shortcut__icon">
            <span class="iconfont icon-qunzu_o"></span>
          </div>
          <div class="shortcut__caption">运维管理子系统</div>
        </div>

    </div>

</div>
</template>
<script>
export default {
  methods: {
    nav(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40px 100px 0 100px;
}

.shortcut__icon {
  height: 80px;
  line-height: 80px;
  color: #fff;
  text-align: center;
  background: #3fa1f2;
  border-radius: 4px;
}

.shortcut {
  float: left;
  width: 80px;
  margin: 24px;
  cursor: pointer;

  &:nth-of-type(2) {
    .shortcut__icon {
      color: #5a4118;
      background-color: #f8e2b3;
    }
  }
}

.shortcut:hover .shortcut__icon {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.iconfont {
  font-size: 64px;
}

.shortcut__caption {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4;
  color: #fff;
  text-align: center;
}
</style>

