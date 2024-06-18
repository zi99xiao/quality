<template>
  <div class="common-layout">
    <el-container>
      <!--      顶部-->
      <el-header class="header">
        <span class="title">质量分析平台</span>
        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link" link>
            用户名
            <el-icon>
              <ArrowDown/>
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Lock" @click="openEditPwd">修改密码</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!--      导航和内容区-->
      <el-container>
        <!--        侧边导航-->
        <el-aside width="220px" class="aside">
          <el-scrollbar height="100%">
            <el-menu
                router
                background-color="#222628"
                active-text-color="#0c6fff"
                class="el-menu-vertical-demo"
                text-color="#fff"
                :default-active="currentPath"
                style="border: 0;"
            >
              <!--              首页-->
              <el-menu-item index="/home">
                <el-icon>
                  <component is='HomeFilled'/>
                </el-icon>
                <span>首页</span>
              </el-menu-item>
              <!--              递归菜单组件-->
              <Menu :menus="routes[2].children"/>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!--        内容-->
        <el-main class="main-content">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

    <!--    修改密码弹窗-->
    <el-dialog v-model="openPwdDialog" title="修改密码" center width="400px" draggable destroy-on-close>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon label-position="right" label-width="auto">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" clearable placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="原密码" prop="originPwd">
          <el-input v-model="ruleForm.originPwd" clearable placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="ruleForm.newPwd" clearable placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="重复新密码" prop="againPwd">
          <el-input v-model="ruleForm.againPwd" clearable placeholder="请再次输入新密码"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="submitForm(ruleFormRef)" type="primary" :loading="loading" style="width: 100%;">
          提交
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown, Lock, SwitchButton} from "@element-plus/icons-vue";
import {routes} from "../../router/route.ts";
import {useRouter} from "vue-router";
import {reactive, ref, watchEffect} from "vue";
import Menu from "./Menu.vue";
import {delCookie} from "../../utils/cookie.ts";
import {FormInstance, FormRules} from "element-plus";
import {Md5} from "ts-md5";
import {editPwdData} from "../../api/login";
import {Message} from "../../utils/message.ts";


const router = useRouter()

const loading = ref<boolean>(false)

// =============================修改密码=============================

const ruleFormRef = ref<any>()

interface RuleForm {
  account: string
  originPwd: string
  newPwd: string
  againPwd: string
}

const ruleForm = reactive<RuleForm>({
  account: '',
  originPwd: '',
  newPwd: '',
  againPwd: '',
})

const rules = reactive<FormRules<RuleForm>>({
  account: [{required: true, message: '账号不能为空', trigger: 'blur'},],
  originPwd: [{required: true, message: '原密码不能为空', trigger: 'blur'},],
  newPwd: [{required: true, message: '新密码不能为空', trigger: 'blur'},],
  againPwd: [{required: true, message: '重复新密码不能为空', trigger: 'blur'},],
})

const openPwdDialog = ref<boolean>(false)

function openEditPwd() {
  ruleForm.account = ''
  ruleForm.originPwd = ''
  ruleForm.newPwd = ''
  ruleForm.againPwd = ''
  openPwdDialog.value = true
}

// 编辑密码函数
function editPwd() {
  loading.value = true
  // 接收明文密码，当登录失败时恢复密码展示
  let originPwd: string = ruleForm.originPwd
  let newPwd: string = ruleForm.newPwd
  let againPwd: string = ruleForm.againPwd
  // 定义MD5对象，开始加密密码
  const md5: any = new Md5()
  md5.appendAsciiStr(ruleForm.originPwd)
  md5.appendAsciiStr(ruleForm.newPwd)
  md5.appendAsciiStr(ruleForm.againPwd)
  // 完成加密
  ruleForm.originPwd = md5.end()
  ruleForm.newPwd = md5.end()
  ruleForm.againPwd = md5.end()
  editPwdData(ruleForm).then((res: any) => {
    if (res.data.code === 0) {
      originPwd = ''
      newPwd = ''
      againPwd = ''
      loading.value = false
      Message('密码修改成功,请重新登录', 'success')
      logout()
    } else {
      ruleForm.originPwd = originPwd
      ruleForm.newPwd = newPwd
      ruleForm.againPwd = againPwd
      loading.value = false
      Message(res.data['message'], 'success')
    }
  }).catch(() => {
    ruleForm.originPwd = originPwd
    ruleForm.newPwd = newPwd
    ruleForm.againPwd = againPwd
    loading.value = false
  })
}

// 提交数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      editPwd()
    } else {
      console.log('err', fields)
    }
  })
}

// =============================修改密码=============================

// 退出登录
function logout() {
  delCookie('Authorization')
  localStorage.clear()
  sessionStorage.clear()
  router.push({name: 'login'})
}

// 当前路由
const currentPath = ref<string>('')

// 监听获取当前路由
watchEffect(() => {
  currentPath.value = <string>router.currentRoute.value.fullPath
})
</script>

<style scoped>
.header {
  height: 64px;
  background: #222628;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  line-height: 64px;
  font-size: 20px;
  font-weight: 560;
  padding-left: 8px;
  color: #b4b6bd;
}

.aside {
  height: calc(100vh - 64px);
  background: #222628;
  border-right: 1px solid #0c4fac;
}

.main-content {
  width: calc(100vw - 220px);
  height: calc(100vh - 64px);
  padding: 0;
}
</style>