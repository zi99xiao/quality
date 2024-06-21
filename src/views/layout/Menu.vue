<template>
  <template v-for="res in menus" :key="res.name">
    <el-menu-item v-if="!res.children || res.children.length<1" :index="res.path">
      <template v-if="res.meta.icon">
        <el-icon>
          <component :is='res.meta.icon'/>
        </el-icon>
      </template>
      <template #title>{{ res.meta.title }}</template>
    </el-menu-item>

    <el-sub-menu v-else-if="res.children.length>0" :index="res.path">
      <template #title>
        <template v-if="res.meta.icon">
          <el-icon>
            <component :is='res.meta.icon'/>
          </el-icon>
        </template>
        <span>{{ res.meta.title }}</span>
      </template>
      <Menu :menus="res.children"/>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {PropType} from "vue";
import {Routes} from "../../utils/type/listType.ts";


defineOptions({
  name: 'Menu'
})

defineProps({
  menus: {
    type: Array as unknown as PropType<Routes[]>,
    default: []
  }
})
</script>

<style scoped>
/*.is-active:not(.el-sub-menu) {
  background-color: #111723;
}*/

.is-active .el-sub-menu__title span {
  color: #0c4fac;
}
</style>