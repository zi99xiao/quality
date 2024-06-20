<template>
  <div class="container">
    {{ nowText }}，欢迎使用质量分析平台
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import dayjs from "dayjs";
import {ElNotification} from "element-plus";


const nowText = ref<string>('')
const nowTime = ref<string>('')
const username = ref<string>('')


function timeText() {
  nowTime.value = dayjs().format("HH:mm:ss")
  if (nowTime.value > '18:00' || nowTime.value <= '06:00') {
    nowText.value = '晚上好'
  } else if (nowTime.value > '06:00' && nowTime.value <= '11:00') {
    nowText.value = '上午好'
  } else if (nowTime.value > '11:00' && nowTime.value <= '13:00') {
    nowText.value = '中午好'
  } else if (nowTime.value > '13:00' && nowTime.value <= '18:00') {
    nowText.value = '下午好'
  }
}

onMounted(() => {
  timeText()
  username.value = JSON.parse(localStorage.getItem('UserData')!)['name']
  ElNotification({
    message: username.value + '，' + nowText.value,
    type: 'success',
    offset: 100,
  })
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 30px skyblue, 0 0 20px white;
  background: #2d3a4b url("../../assets/background.jpg");
  background-size: 100%;
}
</style>