<template>
  <div class="container">
    <div class="header">
      <el-card shadow="always">
        <el-button class="add" plain type="primary" :icon="Plus" @click="OpenAdd">新增</el-button>
        <el-button class="del" plain type="danger" :icon="Delete" @click="OpenDel">批量删除</el-button>
        <el-button class="refer" plain type="success" :icon="Refresh" @click="RefreshData">刷新</el-button>
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
        <template #type>
          <el-select
              v-model="searchForm.type"
              filterable
              clearable
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
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
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
import {handleSearchString} from "../../utils/is-search.ts";


const store = useMaintenanceStore()

// 搜索表单
const searchForm = reactive<{
  origin: string
  type: string
  decompose: string
}>({
  origin: '',
  type: '',
  decompose: ''
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
  searchForm.type = ''
  searchForm.decompose = ''
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
@import "../../utils/index.css";
</style>