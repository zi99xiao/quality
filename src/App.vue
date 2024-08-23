<template>
  <starry-sky :stars-count="1000" :distance="1000"/>
  <!--  全局路由出口包括登录页面和layout界面-->
  <router-view/>
</template>

<script setup lang="ts">
import {StarrySky} from "vue3-starry-sky";

</script>

<style scoped>
.starry-sky-bg {
  background: radial-gradient(220% 105% at top center, #403a40 10%, #452d4a 40%, #2b2a44 65%, #000000)!important;
}
</style>