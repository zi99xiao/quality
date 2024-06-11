<!--搜索框-->
<template>
  <div class="header_search">
    <el-input v-model="search" @input="handleSearch" :prefix-icon="Search" clearable :placeholder="placeholder"/>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {ref, watchEffect} from "vue";


const props = defineProps({
  // 接收的值
  search: {
    type: String,
    default: '',
  },
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
const emits = defineEmits(['click-search'])

const search = ref<string>('')
watchEffect(() => {
  search.value = props.search
})

const timeoutId = ref<any>(null);

function handleSearch() {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }

  // 当存在数据时，开启防抖发送，数据为空时，直接发送
  if (search.value) {
    timeoutId.value = setTimeout(() => {
      emits('click-search', search.value);
      timeoutId.value = null; // 清除定时器后重置timeoutId
    }, 1000);
  } else {
    emits('click-search', search.value);
  }
}

</script>

<style scoped>
.header_search {
  width: v-bind(width);
  height: 32px;
}
</style>