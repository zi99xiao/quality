<!--搜索框-->
<template>
  <div class="header_search">
    <el-input v-model="search" @input="handleSearch" :prefix-icon="Search" clearable :placeholder="placeholder"/>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {ref, defineModel} from "vue";


defineProps({
  // placeholder提示
  placeholder: {
    type: String,
    default: '搜索',
  },
  // 搜索框宽度
  width: {
    type: String,
    default: '100%'
  }
})

// 使用defineModel宏接收数据，绑定v-model响应
const search = defineModel<string, "trim">("search", { type: String, default: '' })

const emits = defineEmits(['click-search'])

const timeoutId = ref<any>(null);

function handleSearch() {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }

  // 当存在数据时，开启防抖发送，数据为空时，直接发送
  timeoutId.value = setTimeout(() => {
    emits('click-search', search.value);
    timeoutId.value = null; // 清除定时器后重置timeoutId
  }, 1000);
}

</script>

<style scoped>
.header_search {
  width: v-bind(width);
  height: 32px;
}
</style>