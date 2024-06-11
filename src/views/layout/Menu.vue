<template>
  <template v-for="res in menus" :key="res.name">
    <el-menu-item v-if="!res.children || res.children.length<1" :index="res.path">
      <el-icon>
        <component :is='res.meta.icon'/>
      </el-icon>
      <span>{{ res.meta.title }}</span>
    </el-menu-item>

    <el-sub-menu v-else-if="res.children.length>0" :index="res.path">
      <template #title>
        <el-icon>
          <component :is='res.meta.icon'/>
        </el-icon>
        <span>{{ res.meta.title }}</span>
      </template>
      <Menu :menus="res.children"/>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {PropType} from "vue";


defineOptions({
  name: 'Menu'
})

interface Meta {
  title: string
  icon?: string
}

interface Routes {
  path: string
  redirect?: string
  name: string
  component: any
  meta: Meta
  children?: Routes[]
}

defineProps({
  menus: {
    type: Array as unknown as PropType<Routes[]>,
    default: []
  }
})
</script>

<style scoped>
.is-active:not(.el-sub-menu) {
  background-color: #111723;
}

.is-active .el-sub-menu__title span {
  color: #0c4fac;
}
</style>