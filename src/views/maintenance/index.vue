<template>
  <div class="container">
    <div class="header">
      <el-card shadow="always">
        <el-button class="add" plain type="primary" :icon="Plus" @click="OpenAdd">新增</el-button>
        <el-button class="del" plain type="danger" :icon="Delete" @click="OpenDel">批量删除</el-button>
        <el-button class="refer" plain type="success" :icon="Refresh" @click="RefreshData">刷新/重置</el-button>
        <el-popover placement="bottom" :width="300" trigger="click">
          <template #reference>
            <el-button class="upload" plain type="info" :icon="Upload">导入</el-button>
          </template>
          <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              drag
              accept=".xls,.xlsx,"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="uploadSuccess"
              :on-error="uploadError"
          >
            <template #trigger>
              <el-icon class="el-icon--upload">
                <upload-filled/>
              </el-icon>
              <div class="el-upload__text">
                拖动文件到此或 <em>点击</em>
              </div>
            </template>
            <template #tip>
              <div class="el-upload__tip">
                请上传Excel文件
              </div>
            </template>
          </el-upload>
        </el-popover>
        <el-button class="export" plain :icon="Download" @click="ExportData">导出</el-button>
        <el-popover placement="bottom" :width="100" trigger="hover">
          <template #reference>
            <el-button class="search" type="success">增减搜索条件</el-button>
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
    <div class="table-content">
      <my-table :table-data="store.tableData" :options="store.options" :loading="store.loading" :button="true"
                @click-sel="rowSel" @click-del="rowDel" @click-row="rowGetDetail" @click-save="rowSave">
        <template #origin>
          <header-search @click-search="(e:string)=>handleSearchString(e, 'origin', 'like', store)"
                         v-model:search.trim="searchForm.origin" placeholder="分类来源"/>
        </template>
        <template #description>
          <header-search @click-search="(e:string)=>handleSearchString(e, 'description', 'like', store)"
                         v-model:search.trim="searchForm.description" placeholder="分类描述"/>
        </template>
        <template #type>
          <el-select
              v-model="searchForm.type"
              filterable
              clearable
              :teleported="false"
              @change="(e:string)=>handleSearchString(e, 'type', '=', store)"
              placeholder="对应类型"
          >
            <el-option
                v-for="item in questionTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>
        <template #decompose>
          <el-select
              v-model="searchForm.decompose"
              filterable
              clearable
              :teleported="false"
              @change="(e:string)=>handleSearchString(e, 'decompose', '=', store)"
              placeholder="是否分解"
          >
            <el-option
                v-for="item in isYesNoList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>
        <template #createTime>
          <el-date-picker
              v-model="searchForm.createTime"
              type="datetimerange"
              :teleported="false"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e:string[])=>handleSearchDate(e, 'createTime', '=', store)"
          />
        </template>
        <template #lastTime>
          <el-date-picker
              v-model="searchForm.lastTime"
              type="datetimerange"
              :teleported="false"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e:string[])=>handleSearchDate(e, 'lastTime', '=', store)"
          />
        </template>
        <template #effective>
          <el-select
              v-model="searchForm.effective"
              filterable
              clearable
              :teleported="false"
              @change="(e:string)=>handleSearchString(e, 'effective', '=', store)"
              placeholder="是否有效"
          >
            <el-option
                v-for="item in isYesNoList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>
      </my-table>
    </div>
    <!--    分页-->
    <pagination :total="store.total" :currentPage="store.params.page" :pageSize="store.params.limit"
                @click-current="handleCurrentChange" @click-size="handleSizeChange"/>
    <!--    新增弹窗-->
    <add ref="addRef" :loading="store.loading" @click-submit="SubmitAdd"/>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import {Plus, Delete, Refresh, Upload, Download, UploadFilled} from "@element-plus/icons-vue";
import {UsePageSize} from "../../utils/use-page-size";
import {SelectTableId} from "../../utils/row-sel";
import {useMaintenanceStore} from "../../store/maintenance";
import MyTable from "../../components/my-table/index.vue";
import Pagination from "../../components/pagination/index.vue";
import HeaderSearch from "../../components/header-search/index.vue";
import Add from "./components/add.vue";
import {RowDel} from "../../utils/row-del";
import {addMaintenance, delMaintenance, editMaintenance, getMaintenanceDetail} from "../../api/maintenance";
import {MoreDel} from "../../utils/more-del";
import {ClickRowSave} from "../../utils/click-row-save.ts";
import {IsAdd} from "../../utils/is-add";
import {isYesNoList, questionTypeList} from "../../utils/select-list";
import {genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {Message} from "../../utils/message.ts";
import {handleSearchDate, handleSearchString} from "../../utils/is-search.ts";
import {colChange} from "../../utils/show-cols.ts";


const store = useMaintenanceStore()

// 搜索表单
interface searchType {
  origin: string
  description: string
  type: string
  decompose: string
  createTime: string[]
  lastTime: string[]
  effective: string
}

const searchForm = reactive<searchType>({
  origin: '',
  description: '',
  type: '',
  decompose: '',
  createTime: [],
  lastTime: [],
  effective: '',
})

const {
  addRef,
  OpenAdd,
  SubmitAdd
} = IsAdd(store, addMaintenance)

// 表格多选id
const {selId, rowSel} = SelectTableId()

// 单个行删除
const {rowDel} = RowDel(store, delMaintenance)

// 批量删除
const {OpenDel} = MoreDel(store, selId, delMaintenance)

// 表格编辑保存
const {rowGetDetail, rowSave} = ClickRowSave(store, getMaintenanceDetail, editMaintenance)

// 刷新按钮
function RefreshData() {
  store.loading = true
  searchForm.origin = ''
  searchForm.description = ''
  searchForm.type = ''
  searchForm.decompose = ''
  searchForm.createTime = []
  searchForm.lastTime = []
  searchForm.effective = ''
  store.params.filters = []
  store.getTableData()
}

// 导入操作
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function uploadSuccess() {
  store.loading = true
  Message('上传成功', 'success')
  store.getTableData()
}

function uploadError() {
  store.loading = true
  Message('上传失败', 'error')
  store.loading = false
}

// 导出
function ExportData() {

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
} = UsePageSize(store)
</script>

<style scoped>
@import "../index.css";
</style>