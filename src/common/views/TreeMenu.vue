<template>
  <tree-menu v-for="menu in items"></tree-menu>
  <el-submenu :index="menu.url" v-if="menu.children && menu.children.length > 0">
    <template slot="title">
      <i :class="menu.icon"></i><span>{{ menu.upcRightName }}</span>
    </template>
    <tree-menu :data="menu.children"></tree-menu>
  </el-submenu>

  <el-menu-item :index="menu.url" v-else>
    {{ menu.upcRightName }}
  </el-menu-item>
</template>
<script>
  export default {
    props: [ 'items' ],
  };
</script>