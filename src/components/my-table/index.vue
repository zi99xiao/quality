<template>
  <!--  表格主体-->
  <el-table
      border
      :data="tableData"
      id="my_table"
      class="table"
      ref="multipleTableRef"
      :row-key="props.keys"
      v-loading="loading"
      highlight-current-row
      @row-dblclick="dbRowEdit"
      @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="check" align="center" fixed type="selection" width="50" :reserve-selection="selected"/>
    <el-table-column v-if="index" align="center" fixed type="index" label="序号" width="50" show-overflow-tooltip/>

    <template v-for="val in column">
      <el-table-column align="center" :column-key="val['prop']" :prop="val['prop']" :label="val['label']"
                       :min-width="val['minWidth']" :sortable="val['sortable']" show-overflow-tooltip>
        <template #header>
          <span style="display: none">{{ column }}</span>
          <span>{{ val['label'] }}</span>
          <template v-if="val['isSearch']">
            <el-popover placement="bottom" popper-style="width: auto;" trigger="click">
              <template #reference>
                <el-button link plain @click.stop>
                  <el-icon size="20" class="icon-filter">
                    <Filter/>
                  </el-icon>
                </el-button>
              </template>
              <slot :name="val['prop']"></slot>
            </el-popover>
          </template>
        </template>

        <template #default="{row}">
          <template v-if="val['type']==='text'">
            <el-input
                v-if="row[props.keys]===dbId&&val['cellEdit']"
                v-model="dbValue[val['prop']]"
                clearable
                placeholder="请输入"
                @dblclick.stop
            />
            <span v-else>{{ row[val['prop']] }}</span>
          </template>

          <template v-else-if="val['type']==='textarea'">
            <el-input
                v-if="row[props.keys]===dbId&&val['cellEdit']"
                v-model="dbValue[val['prop']]"
                autosize
                type="textarea"
                placeholder="请输入"
                @dblclick.stop
            />
            <span v-else>{{ row[val['prop']] }}</span>
          </template>

          <template v-else-if="val['type']==='select'">
            <el-select
                v-if="row[props.keys]===dbId&&val['cellEdit']"
                v-model="dbValue[val['prop']]"
                filterable
                placeholder="请选择"
                @dblclick.stop
            >
              <el-option
                  v-for="item in val['data']"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <template v-else v-for="select in val['data']" :key="select.value">
              <span v-if="row[val['prop']]===select.value">{{ select.label }}</span>
            </template>
          </template>

          <template v-if="val['type']==='date'">
            <div style="display:flex;justify-content: center;align-items: center;">
              <el-icon>
                <Clock/>
              </el-icon>
              <div>{{ row[val['prop']] }}</div>
            </div>
          </template>
        </template>
      </el-table-column>
    </template>

    <el-table-column v-if="button" align="center" fixed="right" label="操作" width="150">
      <template #default="{row}">
        <el-button v-if="btn.detail" title="详情" plain type="success" size="small" :icon="View"
                   @click.stop="rowDetail(row)"/>

        <el-button v-if="btn.edit" title="编辑" plain type="warning" size="small" :icon="EditPen"
                   @click.stop="rowEdit(row)"/>

        <el-popconfirm
            v-if="btn.del"
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="QuestionFilled"
            icon-color="#FF9900"
            title="确定删除这条数据吗?"
            @confirm.stop="rowDel(row)"
            @cancel="cancelEvent('取消删除')"
        >
          <template #reference>
            <el-button plain title="删除" type="danger" size="small" @dblclick.stop :icon="DeleteFilled"/>
          </template>
        </el-popconfirm>

        <el-popconfirm
            v-if="row[props.keys]===dbId"
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="QuestionFilled"
            icon-color="#FF9900"
            title="确定保存这条数据吗?"
            @confirm.stop="dbRowSave(row)"
            @cancel="cancelEvent('取消保存')"
        >
          <template #reference>
            <el-button plain title="保存" type="success" size="small" @dblclick.stop :icon="DocumentAdd"/>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {DeleteFilled, EditPen, View, QuestionFilled, DocumentAdd, Filter, Clock} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import {ElTable} from "element-plus";
import {Message} from "../../utils/message";


const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default: [],
  },
  // 表格行的key字段
  keys: {
    type: String,
    default: 'id',
  },
  // 表格列信息
  options: {
    type: Object,
    default: {},
  },
  // 表格加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  // 用于表格复选框刷新是否保留状态
  selected: {
    type: Boolean,
    default: false
  },
  // 负责展示复选框列展示
  check: {
    type: Boolean,
    default: true,
  },
  // 负责序号列展示
  index: {
    type: Boolean,
    default: true
  },
  // 负责操作列展示
  button: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits(["click-detail", "click-edit", "click-del", "click-sel", "click-row", "click-save"])

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

// 计算属性监听按钮变化
const btn = computed(() => props.options.btn)
// 计算展示的列
const filterColumns = (columns: any) => {
  return columns
      .filter((val: any) => val.isShow)
      .map((val: any) => {
        if (val.children) {
          return {
            ...val,
            children: filterColumns(val.children),
          };
        }
        return val;
      });
};
const column = computed(() => filterColumns(props.options.column));
// 计算展示的数据
const tableData = computed(() => props.tableData)

// 当前行的id
const dbId = ref<string>('')
// 操作的数据
const dbValue = ref<any>({})

// 双击行进行表格编辑，判断是否已经在编辑状态以及prop字段是否存在以及是否可以双击编辑
function dbRowEdit(row: any, col: any) {
  if (dbId.value === '' && col.property && column.value.filter((val: any) => val.prop === col.property)[0].cellEdit) {
    dbId.value = row[props.keys]
    emits('click-row', row, dbValue)
  }
}

// 保存表格编辑
function dbRowSave(val: any) {
  emits('click-save', val, dbId)
}

// 编辑按钮
const rowEdit = (val: any) => {
  emits('click-edit', val)
}

// 删除按钮
const rowDel = (val: any) => {
  emits('click-del', val)
}

// 详情按钮
const rowDetail = (val: any) => {
  emits('click-detail', val)
}

// 多选
const handleSelectionChange = (val: any) => {
  emits('click-sel', val)
}

// 取消操作
const cancelEvent = (title: string) => {
  dbId.value = ''
  dbValue.value = {}
  Message(title, 'info')
}
</script>

<style scoped>
.table {
  width: 100%;
  height: 100%;
}

:deep(.cell) {
  padding: 0 8px;
}

.icon-filter:hover {
  color: #0765e3;
}
</style>