<template>
  <div class="container">
    <div class="header">
      <el-card shadow="always">
        <el-button plain type="success" :icon="Refresh" @click="RefreshData">刷新</el-button>
      </el-card>
    </div>
    <!--    表格-->
    <div class="table-content">
      <my-table :table-data="store.tableData" :options="store.options" :loading="store.loading" :show="false">
        <template #origin>
          <header-search :search="searchForm.origin" @click-search="handleSearchOrigin" placeholder="异常来源"/>
        </template>
        <template #information>
          <header-search :search="searchForm.information" @click-search="handleSearchInformation"
                         placeholder="异常信息"/>
        </template>
        <template #reason>
          <header-search :search="searchForm.reason" @click-search="handleSearchReason" placeholder="异常原因"/>
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

// 分析来源搜索值
function handleSearchOrigin(search: string) {
  store.loading = true
  searchForm.origin = search
  if (searchForm.origin) {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'origin';
    });
    store.params.filters.push({
      column: 'origin',
      value: searchForm.origin,
      operator: 'like'
    });
  } else {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'origin';
    });
  }
  store.getTableData()
}

// 异常信息搜索值
function handleSearchInformation(search: string) {
  store.loading = true
  searchForm.information = search
  if (searchForm.information) {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'information';
    });
    store.params.filters.push({
      column: 'information',
      value: searchForm.information,
      operator: '='
    });
  } else {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'information';
    });
  }
  store.getTableData()
}

// 异常原因搜索值
function handleSearchReason(search: string) {
  store.loading = true
  searchForm.reason = search
  if (searchForm.reason) {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'reason';
    });
    store.params.filters.push({
      column: 'reason',
      value: searchForm.reason,
      operator: '='
    });
  } else {
    store.params.filters = store.params.filters!.filter((item: any) => {
      return item.column !== 'reason';
    });
  }
  store.getTableData()
}

// 刷新按钮
function RefreshData() {
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