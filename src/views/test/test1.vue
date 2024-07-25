<template>
  <div class="container">
    <div style="height: 100%;">
      <el-input v-model="value" @input="searchValue" placeholder="请输入问题" clearable style="padding: 10px"/>
      <el-scrollbar style="height: calc(100% - 52px)">
        <div v-for="item in data" style="padding: 10px">
          <el-card style="width: 100%">
            <template #header>
              <div class="card-header">
                <span>{{ item['content'] }}</span>
              </div>
            </template>
            <p v-for="val in item['answer']">
              <span :style="{color: val['is_right']?'red': ''}">{{ val['content'] }}</span>
            </p>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import jsonFile from "./files/综合能力-管理标准法律法规.json";
import {computed, onMounted, ref} from "vue";
import {Message} from "../../utils/message.ts";

const value = ref('')

const data = ref([])

function searchValue(obj: string) {
  if (obj) {
    const result = computed(() => data.value.filter((val: any) => val['content'].includes(obj)))
    data.value = result.value
  } else {
    data.value = jsonFile['exercise_data']
  }
}

onMounted(() => {
  Message('红色的正确', 'success')
  data.value = jsonFile['exercise_data']
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>