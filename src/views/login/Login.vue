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
        <el-form-item prop="name">
          <el-input class="input" v-model.trim="ruleForm.name" clearable :prefix-icon="User" placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input class="input" v-model.trim="ruleForm.pwd" type="password" show-password clearable
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
import {Md5} from 'ts-md5';
import {useRouter} from "vue-router";
import {login} from "../../api/login";
import {Message} from "../../utils/message.ts";
import {setCookie} from "../../utils/cookie.ts";


const router = useRouter();

const loading = ref<boolean>(false)

const ruleFormRef = ref<any>()

interface RuleForm {
  name: string
  pwd: string
}

const ruleForm = reactive<RuleForm>({
  name: "",
  pwd: ""
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{required: true, message: '账号不能为空', trigger: 'blur'},],
  pwd: [{required: true, message: '密码不能为空', trigger: 'blur'},],
})

// 登录函数
function postLogin() {
  loading.value = true
  // 接收明文密码，当登录失败时恢复密码展示
  let pwd: string = ruleForm.pwd
  // 定义MD5对象，开始加密密码
  const md5: any = new Md5()
  md5.appendAsciiStr(ruleForm.pwd)
  // 完成加密
  ruleForm.pwd = md5.end()
  login(ruleForm).then((res: any) => {
    if (res.data.code === 0) {
      setCookie('Authorization', res.data.data, 7)
      router.push({name: 'home'})
      pwd = ''
      loading.value = false
      Message('登录成功', 'success')
    } else {
      ruleForm.pwd = pwd
      loading.value = false
      Message(res.data['message'], 'success')
    }
  }).catch(() => {
    ruleForm.pwd = pwd
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