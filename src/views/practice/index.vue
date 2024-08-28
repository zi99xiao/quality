<template>
  <div class="container">
    <div style="height: 32px;display: flex;flex: 1">
      <el-select
          v-model="colName"
          placeholder="选择搜索条件"
          style="width: 240px"
          clearable
          @change="selectChange"
          @clear="clearSearch"
      >
        <el-option
            v-for="item in colList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-input v-model="colValue" placeholder="请输入" clearable :disabled="!colName" @clear="clearSearch"/>
      <el-button type="primary" @click="handleSearchData(colValue, colName, 'like')">查 询</el-button>
    </div>
    <el-scrollbar style="height: calc(100% - 76px);margin: 10px 0">
      <div class="cards">
        <template v-for="item in tableData">
          <el-card class="data-card" shadow="always">
            <p>
              <el-link @click="getDetail(item.dataId)" type="primary">数据id：{{ item.dataId }}</el-link>
            </p>
            <p><span>数据值：</span>{{ item.dataVal }}</p>
            <p><span>所属节点key：</span>{{ item.nodeKey }}</p>
            <p><span>所属节点名称：</span>{{ item.nodeName }}</p>
            <p><span>所属设备key：</span>{{ item.deviceKey }}</p>
            <p><span>所属设备名称：</span>{{ item.deviceName }}</p>
          </el-card>
        </template>
      </div>
    </el-scrollbar>
    <pagination :total="total" :currentPage="params.page" :pageSize="params.limit"
                @click-current="handleCurrentChange" @click-size="handleSizeChange"/>
    <el-dialog v-model="detail" title="详情" center width="400px" draggable destroy-on-close :before-close="clearClose">
      <el-card class="data-card" shadow="always">
        <p><span>数据id：</span>{{ detailData.dataId }}</p>
        <p><span>数据值：</span>{{ detailData.dataVal }}</p>
        <p><span>数据采集时间：</span>{{ detailData.date }}</p>
        <p><span>所属设备key：</span>{{ detailData.deviceKey }}</p>
        <p><span>所属设备名称：</span>{{ detailData.deviceName }}</p>
        <p><span>所属节点key：</span>{{ detailData.nodeKey }}</p>
        <p><span>所属节点名称：</span>{{ detailData.nodeName }}</p>
        <p><span>所属设备状态：</span>{{ detailData.status }}</p>
        <p><span>所属设备额外信息：</span>{{ detailData.extraInfo }}</p>
      </el-card>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import Pagination from "../../components/pagination/index.vue";


const tableData = ref<any[]>([])
const loading = ref(true)
const total = ref<number>(0)
const params = reactive({
  page: 1,
  limit: 20,
  condition: {},
  filters: [] as any[]
})

async function getList() {
  try {
    const res = await axios({
      url: 'http://10.20.72.33:8080/api/device/list',
      method: 'post',
      data: params
    })
    if (res.data.code === 0) {
      tableData.value = res.data.data
      total.value = res.data.total
    } else {
      alert(res.data.message)
    }
  } catch (error: any) {
    throw new Error('请求失败')
  } finally {
    loading.value = false
  }
}

function handleCurrentChange(current: number) {
  params.page = current
  loading.value = true
  getList()
}

function handleSizeChange(size: number, current: number) {
  params.page = current
  params.limit = size
  loading.value = true
  getList()
}

const detailData = ref<any>({})
const detail = ref<boolean>(false)

async function getDetail(id: string) {
  try {
    const res = await axios({
      url: `http://10.20.72.33:8080/api/device/detail/${id}`,
      method: 'get'
    })
    if (res.data.code === 0) {
      detailData.value = res.data.data
      detail.value = true
    } else {
      alert(res.data.message)
    }
  } catch (error: any) {
    throw new Error('请求失败')
  }
}

function clearClose() {
  detailData.value = []
  detail.value = false
}

onMounted(() => {
  getList()
})

const colName = ref<string>('')
const colValue = ref<unknown>()
const colList = [
  {value: 'dataId', label: '数据id'},
  {value: 'dataVal', label: '数据值'},
  {value: 'nodeKey', label: '所属节点key'},
  {value: 'nodeName', label: '所属节点名称'},
  {value: 'deviceKey', label: '所属设备key'},
  {value: 'deviceName', label: '所属设备名称'},
]

function selectChange(val: string) {
  colName.value = val
  params.filters = []
  if (!colName.value) {
    colValue.value = ''
  }
}

function clearSearch() {
  colValue.value = ''
}

function handleSearchData(search: unknown, column: string, operator: string) {
  loading.value = true
  // 字符类型
  if (typeof search === 'string' && search) {
    console.log(111)
    params.filters = params.filters!.filter((item: any) => {
      return item.column !== column;
    });
    params.filters.push({
      column: column,
      value: search,
      operator: operator
    });
  }
  // 日期数组类型
  else if (Array.isArray(search) && search.length > 0) {
    console.log(222)
    params.filters = params.filters!.filter((item: any) => {
      return item.column !== column;
    });
    params.filters.push({
      column: column,
      value: search.join(','),
      operator: operator
    });
  }
  // 布尔类型
  else if (typeof search === 'boolean') {
    console.log(333)
    params.filters = params.filters!.filter((item: any) => {
      return item.column !== column;
    });
    params.filters.push({
      column: column,
      value: search,
      operator: operator
    });
  }
  // 数字类型
  else if (typeof search === 'number') {
    console.log(444)
    params.filters = params.filters!.filter((item: any) => {
      return item.column !== column;
    });
    params.filters.push({
      column: column,
      value: search,
      operator: operator
    });
  }
  // null类型或者未定义的undefined类型
  else {
    console.log(555)
    params.filters = params.filters!.filter((item: any) => {
      return item.column !== column;
    });
  }
  getList()
}
</script>

<style scoped>
.container {
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}

.cards {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.data-card {
  font-size: 14px;
}

.data-card span {
  color: red;
}
</style>