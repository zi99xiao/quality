<template>
  <div class="container">
    <div class="header">
      <el-card shadow="always">
        <el-button plain type="success" :icon="Refresh" @click="RefreshData">刷新</el-button>
      </el-card>
    </div>
    <!--    表格-->
    <div class="table-content">
      <my-table :table-data="store.tableData" :options="store.options" :loading="store.loading" :check="false">
        <template #origin>
          <header-search @click-search="(e:string)=>handleSearchString(e, 'origin', 'like', store)"
                         v-model:search.trim="searchForm.origin" placeholder="异常来源"/>
        </template>
        <template #information>
          <header-search @click-search="(e:string)=>handleSearchString(e, 'information', 'like', store)"
                         v-model:search.trim="searchForm.information" placeholder="异常信息"/>
        </template>
        <template #reason>
          <header-search @click-search="(e:string)=>handleSearchString(e, 'reason', 'like', store)"
                         v-model:search.trim="searchForm.reason" placeholder="异常原因"/>
        </template>
      </my-table>
    </div>
    <!--    分页-->
    <pagination :total="store.total" :currentPage="store.params.page" :pageSize="store.params.limit"
                @click-current="handleCurrentChange" @click-size="handleSizeChange"/>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, reactive} from "vue";
import {Refresh} from "@element-plus/icons-vue";
import {UsePageSize} from "../../utils/use-page-size";
import {useExceptionStore} from "../../store/exception";
import MyTable from "../../components/my-table/index.vue";
import Pagination from "../../components/pagination/index.vue";
import HeaderSearch from "../../components/header-search/index.vue";
import {handleSearchString} from "../../utils/is-search.ts";


const store = useExceptionStore()

// 搜索表单
const searchForm = reactive<{
  origin: string
  information: string
  reason: string
}>({
  origin: '',
  information: '',
  reason: ''
})

// 刷新按钮
function RefreshData() {
  store.loading = true
  searchForm.origin = ''
  searchForm.information = ''
  searchForm.reason = ''
  store.params.filters = []
  store.getTableData()
}

// 生命周期操作
onMounted(() => {
  store.loading = true
  nextTick(() => {
    store.getTableData()
  })
})

onUnmounted(() => {
  store.params.filters = []
})

const {
  handleCurrentChange,
  handleSizeChange
} = UsePageSize(store)
</script>

<style scoped>
.container {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}

.header {
  height: 40px;
  margin-bottom: 6px;
}

.header .el-card {
  height: 100%;
}

:deep(.header .el-card__body) {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
}

.table-content {
  height: calc(100% - 70px);
  margin-bottom: 5px;
}
</style>