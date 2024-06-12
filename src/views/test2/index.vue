<script setup lang="ts">
import jsonfile from "./综合能力-企业文化.json";

const data = JSON.parse(JSON.stringify(jsonfile.exercise_data))
</script>

<template>
  <template v-for="value in data">
    <el-card shadow="hover" style="margin-bottom: 10px;">
      <template #header>
        <div>{{ value.content }}</div>
      </template>
      <div v-for="obj in value.answer">
        <div :style="{color: obj.is_right===1?'red':'white', marginBottom: '5px'}">{{ obj.content }}</div>
      </div>
    </el-card>
  </template>
</template>

<style scoped>

</style>