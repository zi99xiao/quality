<template>
  <div class="common-layout">
    <el-container>
      <!--        侧边导航-->
      <el-aside :width="isCollapse?'65px':'220px'" class="aside">
        <el-scrollbar height="100%">
          <el-menu
              router
              :collapse="isCollapse"
              text-color="#ffffff"
              background-color="#222628"
              active-text-color="#67c9fa"
              class="el-menu-vertical-demo"
              :default-active="route.path"
          >
            <!--              首页-->
            <el-menu-item index="/home">
              <el-icon>
                <component is='HomeFilled'/>
              </el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <!--              递归菜单组件-->
            <!--            <Menu :menus="routes[2].children"/>-->
            <Menu :menus="showMenus(menus)"/>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!--      导航和内容区-->
      <el-container>
        <!--      顶部导航栏-->
        <el-header class="header">
          <div style="display: flex;align-items: center;">
            <el-button class="fold" link :icon="isCollapse?Expand:Fold" @click="isCollapse=!isCollapse"/>
            <el-breadcrumb style="margin-left: 20px;" separator="/" :separator-icon="ArrowRight">
              <el-breadcrumb-item
                  v-for="item in route.matched.filter((_, index: number)=>index!==0)"
                  :key="item.path"
                  v-show="item.meta.title"
                  :to="item.path"
              >
                <template v-if="item.meta.icon">
                  <el-icon style="vertical-align: middle">
                    <component :is="item.meta.icon"/>
                  </el-icon>
                </template>
                <span style="margin: 0 5px; vertical-align: middle">{{ item.meta.title }}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="dropdown">
            <el-button title="全屏" link color="#000" :icon="FullScreen" @click="handleFullScreen"/>
            <el-button class="dropdown-child" link color="#000">
              <span>{{ userdata.orgName }}</span>
            </el-button>
            <el-dropdown class="dropdown-child" trigger="click" max-height="300">
              <el-button class="el-dropdown-link" link color="#000">
                <span>{{ userdata.roleName }}</span>
                <el-icon>
                  <ArrowDown/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="role in roles" :key="role.roleId">
                    <el-dropdown-item @click="selectRole(role)">{{ role.roleName }}</el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown class="dropdown-child" trigger="click">
              <el-button class="el-dropdown-link" link color="#000">
                <span>{{ userdata.name }}</span>
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
            <el-avatar class="avatar" :src="RC" :size="40" fit="cover"
                       @mouseenter="Message('翻滚吧，牛马', 'success')"/>
          </div>
        </el-header>
        <!--        内容-->
        <el-main class="main-content">
          <!--          layout下属界面路由出口-->
          <router-view ref="viewRef" class="main-container"/>
        </el-main>
      </el-container>
    </el-container>
    <!--    修改密码弹窗-->
    <el-dialog v-model="openPwdDialog" title="修改密码" center width="400px" draggable destroy-on-close>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon label-position="right" label-width="auto">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" disabled/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password clearable placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="againPwd">
          <el-input v-model="ruleForm.againPwd" type="password" show-password clearable placeholder="请再次输入新密码"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitForm(ruleFormRef)" type="primary" :loading="loading" class="submit">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown, ArrowRight, Expand, Fold, FullScreen, Lock, SwitchButton} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import Menu from "./Menu.vue";
import {delCookie, getCookie, setCookie} from "../../utils/cookie";
import {FormInstance, FormRules} from "element-plus";
import {editPwdData, getMenuButtonList, getUserRole} from "../../api/login";
import {useFullScreenEffect} from "../../utils/full-screen";
import {Message} from "../../utils/message";
import RC from "../../assets/R-C.png";
import {showMenus} from "../../utils/menus";


// 是否折叠菜单
const isCollapse = ref(false)

// 使用路由方法
const router = useRouter()

// 获取路由对象
const route = useRoute()

const loading = ref<boolean>(false)

const viewRef = ref<any>()

// 全屏
const {handleFullScreen} = useFullScreenEffect()

// 展示的用户信息
const userdata = reactive<{
  name: string
  roleName: string
  orgName: string
}>({
  name: '',
  roleName: '',
  orgName: ''
})

// 获取菜单/按钮数据
const menus = ref<any[]>([])
const buttons = ref<any[]>([])

function getMenuButtonData() {
  getMenuButtonList({}).then((res: any) => {
    if (res.data.code === 0) {
      menus.value = res.data.data[0].rows.filter((val: any) => val.type === 1)
      buttons.value = res.data.data[0].rows.filter((val: any) => val.type === 2)
      // 向localStorage写入菜单/按钮数据
      localStorage.setItem('menus', JSON.stringify(menus.value))
      localStorage.setItem('buttons', JSON.stringify(buttons.value))
    } else {
      Message(res.data['message'], 'error')
    }
  })
}

// 获取用户角色列表
const roles = ref<any[]>([])

function getUserRoleData() {
  getUserRole({tenantId: getCookie('tenantId')}).then((res: any) => {
    if (res.data.code === 0) {
      roles.value = res.data.data
      // 判断cookie是否存在，否则写入数据
      if (!getCookie('roleId')) {
        setCookie('roleId', roles.value[0]['roleId'], 7)
        localStorage.setItem('currentRole', JSON.stringify(roles.value[0]))
      }
      userdata.roleName = JSON.parse(localStorage.getItem('currentRole')!)['roleName']
      // 当角色写入cookies后请求对应的菜单和按钮数据
      getMenuButtonData()
    } else {
      Message(res.data['message'], 'error')
    }
  }).catch((err: any) => {
    if (err.response.status === 401) {
      logout()
    }
  })
}

// 进入时加载
onMounted(() => {
  // 发起请求，获取角色列表
  getUserRoleData()
  // 获取用户名/公司名
  userdata.name = JSON.parse(localStorage.getItem('UserData')!)['name']
  userdata.orgName = JSON.parse(localStorage.getItem('UserData')!)['orgName']
})

// 切换角色
function selectRole(val: any) {
  setCookie('roleId', val.roleId, 7)
  localStorage.setItem('currentRole', JSON.stringify(val))
  userdata.roleName = val.roleName
  router.push({name: 'home'})
  getMenuButtonData()
}

// =============================修改密码=============================

const ruleFormRef = ref<any>()

interface RuleForm {
  account: string
  password: string
  againPwd: string
}

const ruleForm = reactive<RuleForm>({
  account: '',
  password: '',
  againPwd: '',
})

// 定义自定义验证器函数
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else if (ruleForm[rule['field']] !== ruleForm.againPwd) {
    callback(new Error("字段名不一致!"))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入密码不一致!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  password: [{required: true, message: '新密码不能为空', trigger: 'blur'},],
  againPwd: [{required: true, validator: validatePass, trigger: 'blur'}],
})

const openPwdDialog = ref<boolean>(false)

function openEditPwd() {
  ruleForm.account = JSON.parse(localStorage.getItem('UserData')!)['loginAccount']
  ruleForm.password = ''
  ruleForm.againPwd = ''
  openPwdDialog.value = true
}

// 编辑密码函数
function editPwd() {
  loading.value = true
  // 接收明文密码，当登录失败时恢复密码展示
  // let password: string = ruleForm.password
  // let againPwd: string = ruleForm.againPwd
  // // 定义MD5对象，开始加密密码
  // const md5: any = new Md5()
  // md5.appendAsciiStr(ruleForm.password)
  // md5.appendAsciiStr(ruleForm.againPwd)
  // // 完成加密
  // ruleForm.password = md5.end()
  // ruleForm.againPwd = md5.end()
  editPwdData(ruleForm).then((res: any) => {
    if (res.data.code === 0) {
      loading.value = false
      Message('密码修改成功,请重新登录', 'success')
      logout()
    } else {
      // ruleForm.password = password
      // ruleForm.againPwd = againPwd
      loading.value = false
      Message(res.data['message'], 'success')
    }
  }).catch(() => {
    // ruleForm.password = password
    // ruleForm.againPwd = againPwd
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
  localStorage.clear()
  sessionStorage.clear()
  delCookie('Authorization')
  delCookie('roleId')
  delCookie('tenantId')
  router.push({name: 'login'})
}
</script>

<style scoped>
.aside {
  height: 100vh;
  background: #222628;
  border-right: 1px solid #6487ff;
  transition: width 0.9s;
  opacity: 0.6;
}

.el-menu-vertical-demo {
  border: 0;
  height: 100%;
}

.header {
  height: 64px;
  width: 100%;
  background: #222628;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  opacity: 0.75;
}

.fold {
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.dropdown {
  display: flex;
  align-items: center;
}

.dropdown-child {
  padding: 0 5px;
}

.avatar {
  z-index: 10;
  transform: scale(1) rotate(0deg);
  transition: all 1s;
}

.avatar:hover {
  z-index: 10;
  margin-left: 10px;
  margin-right: 5px;
  transform: scale(1.5) rotate(-360deg);
}

.main-content {
  height: calc(100vh - 64px);
  padding: 0;
}

.main-container {
  animation: enterMain 1s ease-out forwards;
}

@keyframes enterMain {
  from {
    opacity: 0;
    transform: scale(0);
    filter: drop-shadow(16px 16px 20px #b6ead4) invert(75%);
  }
  to {
    opacity: 0.75;
    transform: scale(1);
  }
}

.submit {
  width: 100%;
}
</style>