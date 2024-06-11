<!--分页器-->
<template>
  <el-pagination
      small
      background
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 50, 100, 500, 1000]"
      :layout="layout"
      :hide-on-single-page="hide"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue'


const props = defineProps({
  // 数据总条数
  total: {
    type: Number,
    default: 0,
  },
  // 当前页码
  currentPage: {
    type: Number,
    default: 1,
  },
  // 当前条数
  pageSize: {
    type: Number,
    default: 20,
  },
  // 是否隐藏分页
  hide: {
    type: Boolean,
    default: false,
  },
  // 分页展示的东西
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
})
const emits = defineEmits(['click-current', 'click-size'])

const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(20)

watchEffect(() => {
  total.value = props.total
  currentPage.value = props.currentPage
  pageSize.value = props.pageSize
})

const handleSizeChange = (val: number) => {
  currentPage.value = 1
  emits('click-size', val, currentPage.value)
}

const handleCurrentChange = (val: number) => {
  emits('click-current', val)
}
</script>

<style scoped>
.el-pagination {
  height: 24px;
}
</style>