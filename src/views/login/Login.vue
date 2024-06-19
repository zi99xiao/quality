<template>
  <div class="login">
    <div style="margin: 25vh auto">
      <h1 style="text-align: center;margin: 32px 0">质量分析平台</h1>
      <el-form
          ref="ruleFormRef"
          style="width: 400px"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item prop="account">
          <el-input class="input" v-model.trim="ruleForm.account" clearable :prefix-icon="User" placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input" v-model.trim="ruleForm.password" type="password" show-password clearable
                    :prefix-icon="Lock" placeholder="密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" color="#0c4fac" class="submit" @click="submitForm(ruleFormRef)" v-loading="loading">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {User, Lock} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {login} from "../../api/login";
import {Message} from "../../utils/message";
import {setCookie} from "../../utils/cookie";


const router = useRouter();

const loading = ref<boolean>(false)

const ruleFormRef = ref<any>()

interface RuleForm {
  account: string
  password: string
}

const ruleForm = reactive<RuleForm>({
  account: "",
  password: "",
})

const rules = reactive<FormRules<RuleForm>>({
  account: [{required: true, message: '账号不能为空', trigger: 'blur'},],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'},],
})

// 登录函数
function postLogin() {
  loading.value = true
  // 接收明文密码，当登录失败时恢复密码展示
  // let password: string = ruleForm.password
  // // 定义MD5对象，开始加密密码
  // const md5: any = new Md5()
  // md5.appendAsciiStr(ruleForm.password)
  // // 完成加密
  // ruleForm.password = md5.end()
  login(ruleForm).then((res: any) => {
    if (res.data.code === 0) {
      setCookie('tenantId', '1739466802218676224', 7)
      setCookie('Authorization', res.headers.get('authorization'), 7)
      localStorage.setItem('UserData', JSON.stringify(res.data.data))
      router.push({name: 'home'})
      loading.value = false
      Message('登录成功', 'success')
    } else {
      // ruleForm.password = password
      loading.value = false
      Message(res.data['message'], 'error')
    }
  }).catch(() => {
    // ruleForm.password = password
    loading.value = false
  })
}

// 提交数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 登录请求
      postLogin()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.login {
  display: flex;
  height: 100vh;
  overflow: auto;
  background: #2d3a4b url("../../assets/background.jpg");
  background-size: 100%;
}

.input {
  height: 50px;
  background-color: #212534;
  border-radius: 5px;
}

.submit {
  width: 100%;
  height: 44px;
  box-shadow: 0 2px #212534;
}

.el-form-item {
  margin-bottom: 24px;
}
</style>