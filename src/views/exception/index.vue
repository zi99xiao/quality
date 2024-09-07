<template>
  <div class="container">
    <div class="header">
      <el-card shadow="always">
        <el-button v-has="'/exception/refer'" class="refer" plain type="success" :icon="Refresh" @click="RefreshData">
          刷新/重置
        </el-button>
        <el-popover placement="bottom" :width="100" trigger="hover">
          <template #reference>
            <el-button v-has="'/exception/search'" class="search" type="success" :icon="Search">增减搜索条件</el-button>
          </template>
          <el-checkbox
              v-model="store.hidesAll"
              :indeterminate="store.isIndeterminate"
              @change="handleCheckAllChange"
          >
            <h4 style="color: gray">是否全选</h4>
          </el-checkbox>
          <el-scrollbar height="200">
            <el-checkbox-group v-model="store.hides" v-for="item in columns" :key="item.isHideSearch"
                               @change="colChange(store.hides, columns,'hidesAll', 'isIndeterminate', 'isSearch', 'isHideSearch', store)">
              <el-checkbox :label="item.label" :value="item.isHideSearch"/>
            </el-checkbox-group>
          </el-scrollbar>
        </el-popover>
      </el-card>
    </div>
    <!--    表格-->
    <div ref="scrollRef" class="table-content">
      <my-table :table-data="store.tableData" :options="store.options" :loading="store.loading" :check="false">
        <template #origin>
          <header-search @click-search="(e:string)=>handleSearch(e, 'origin', 'like', store)"
                         v-model:search.trim="searchForm.origin" placeholder="异常来源"/>
        </template>
        <template #information>
          <header-search @click-search="(e:string)=>handleSearch(e, 'information', 'like', store)"
                         v-model:search.trim="searchForm.information" placeholder="异常信息"/>
        </template>
        <template #reason>
          <header-search @click-search="(e:string)=>handleSearch(e, 'reason', 'like', store)"
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
import {computed, nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import {Refresh, Search} from "@element-plus/icons-vue";
import MyTable from "../../components/my-table/index.vue";
import Pagination from "../../components/pagination/index.vue";
import HeaderSearch from "../../components/header-search/index.vue";
import {useExceptionStore} from "../../store/exception";
import {UsePageSize} from "../../utils/use-page-size";
import {handleSearch} from "../../utils/is-search";
import {colChange} from "../../utils/show-cols";


const store = useExceptionStore()

const scrollRef = ref<any>()

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

// 表格列搜索显隐数据
const columns = computed(() => store.options.column.filter((col: any) => col.isHideSearch))

const handleCheckAllChange = (val: boolean) => {
  store.hides = val ? columns.value.map((obj: any) => obj.isHideSearch) : []
  store.isIndeterminate = false
  colChange(store.hides, columns.value, 'hidesAll', 'isIndeterminate', 'isSearch', 'isHideSearch', store)
}

// 生命周期操作
onMounted(() => {
  store.loading = true
  nextTick(() => {
    store.getTableData()
    // 计算需要展示搜索的列
    const col = computed(() => store.options.column.filter((col: any) => col.isSearch && col.isHideSearch))
    store.hides = col.value.map((col: any) => col.isHideSearch)
  })
})

onUnmounted(() => {
  store.params.filters = []
})

const {
  handleCurrentChange,
  handleSizeChange
} = UsePageSize(store, scrollRef)
</script>

<style scoped>
@import "../index.css";
</style>