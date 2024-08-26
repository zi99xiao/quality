<template>
  <el-dialog v-model="add" title="新增" center width="600px" draggable destroy-on-close :before-close="clearClose">
    <el-scrollbar max-height="500px">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon label-position="right" label-width="auto">
        <el-form-item label="分类来源" prop="origin">
          <el-input v-model="ruleForm.origin" clearable placeholder="分类来源"/>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input autosize type="textarea" v-model="ruleForm.description" placeholder="分类描述"/>
        </el-form-item>
        <el-form-item label="对应类型" prop="type">
          <el-select
              v-model="ruleForm.type"
              filterable
              clearable
              placeholder="对应类型"
          >
            <el-option
                v-for="item in questionTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否分解" prop="decompose">
          <el-select
              v-model="ruleForm.decompose"
              filterable
              clearable
              placeholder="是否分解"
          >
            <el-option
                v-for="item in isYesNoList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="submitForm(ruleFormRef)" type="primary" :loading="loading" class="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {FormInstance, FormRules} from 'element-plus'
import {reactive, ref} from "vue";
import {isYesNoList, questionTypeList} from "../../../utils/select-list";


defineProps({
  loading: {
    type: Boolean,
    default: false
  },
});
const emits = defineEmits(['click-submit'])

const ruleFormRef = ref<any>()
const add = ref<boolean>(false)

interface RuleForm {
  origin: string
  description: string
  type: string
  decompose: string
}

const ruleForm = reactive<RuleForm>({
  origin: '',
  description: '',
  type: '',
  decompose: '',
})

const rules = reactive<FormRules<RuleForm>>({
  origin: [{required: true, message: '分类来源不能为空', trigger: 'blur'},],
  type: [{required: true, message: '对应类型不能为空', trigger: 'blur'},],
  decompose: [{required: true, message: '是否分解不能为空', trigger: 'blur'},],
})

// 关闭前清除数据
function clearClose(done: Function) {
  ruleForm.origin = ''
  ruleForm.description = ''
  ruleForm.type = ''
  ruleForm.decompose = ''
  done()
}

// 提交数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('click-submit', ruleForm)
    } else {
      console.log('err', fields)
    }
  })
}

defineExpose({
  add
})
</script>

<style scoped>
.submit {
  width: 100%;
}
</style>