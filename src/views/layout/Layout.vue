<template>
  <div class="common-layout">
    <el-container>
      <!--      顶部-->
      <el-header class="header">
        <span class="title">质量分析平台</span>
        <el-dropdown>
          <el-button link>
            用户名
            <el-icon>
              <ArrowDown/>
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Lock" @click="">修改密码</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" @click="">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-container>
        <!--        侧边导航-->
        <el-aside width="220px" class="aside">
          <el-scrollbar height="100%">
            <el-menu
                router
                background-color="#222628"
                active-text-color="#0c6fff"
                class="el-menu-vertical-demo"
                text-color="#fff"
                :default-active="currentPath"
                style="border: 0;"
            >
              <Menu :menus="routes[1].children"/>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <!--        内容-->
        <el-main class="main-content">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown, Lock, SwitchButton} from "@element-plus/icons-vue";
import {routes} from "../../router/route.ts";
import {useRouter} from "vue-router";
import {ref, watchEffect} from "vue";
import Menu from "./Menu.vue";


const router = useRouter()
// 当前路由
const currentPath = ref<string>('')
watchEffect(() => {
  currentPath.value = <string>router.currentRoute.value.fullPath
})
</script>

<style scoped>
.header {
  height: 64px;
  background: #222628;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
}

.title {
  line-height: 64px;
  font-size: 20px;
  font-weight: 560;
  padding-left: 8px;
  color: #b4b6bd;
}

.aside {
  height: calc(100vh - 64px);
  background: #222628;
  border-right: 1px solid #0c4fac;
}

.main-content {
  width: calc(100vw - 220px);
  height: calc(100vh - 64px);
  padding: 0;
}
</style>