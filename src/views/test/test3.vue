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
              <span :style="{color: val['is_right']?'green': ''}">
                {{ val['is_right'] ? '√：':'×：' }}{{ val['content'] }}
              </span>
            </p>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import jsonFile from "./files/管理制度1008-预习.json";
import {computed, onMounted, ref} from "vue";
import {Message} from "../../utils/message";

const value = ref<string>('')

const data = ref<any[]>([])

function searchValue(obj: string) {
  data.value = jsonFile['exercise_data']
  if (obj) {
    const result = computed(() => data.value.filter((val: any) => val['content'].includes(obj)))
    data.value = result.value
  } else {
    data.value = jsonFile['exercise_data']
  }
}

onMounted(() => {
  Message('绿色选项的是正确答案', 'success')
  data.value = jsonFile['exercise_data']
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>