<template>
  <template v-for="res in menus" :key="res.path">
    <template v-if="!res.children || res.children.length<1">
      <el-menu-item v-if="!res.meta.hidden" :index="res.path">
        <template v-if="res.meta.icon">
          <el-icon>
            <component :is='res.meta.icon'/>
          </el-icon>
        </template>
        <template #title>{{ res.meta.title }}</template>
      </el-menu-item>
    </template>

    <template v-else-if="res.children.length>0">
      <el-sub-menu v-if="!res.meta.hidden" :index="res.path">
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
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {PropType} from "vue";
import {Routes} from "../../utils/type/listType";


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

</style>