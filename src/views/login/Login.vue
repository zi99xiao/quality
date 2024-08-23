<template>
  <div class="login">
    <div class="login-form">
      <div style="display: flex;justify-content: center;align-items: center;">
        <h1 class="title">品监运算中心</h1>
        <el-icon :size="30" color="#30ffd5" class="h-icon">
          <Tools/>
        </el-icon>
      </div>
      <el-form
          ref="ruleFormRef"
          style="width: 400px;"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item prop="account">
          <dv-border-box8 :dur="5">
            <el-input class="input" v-model.trim="ruleForm.account" clearable @keyup.enter="nextFocus(pwd)"
                      :prefix-icon="User" placeholder="用户名"/>
          </dv-border-box8>
        </el-form-item>
        <el-form-item prop="password">
          <dv-border-box8 :dur="5">
            <el-input class="input" v-model.trim="ruleForm.password" clearable @keyup.enter="submitForm(ruleFormRef)"
                      ref="pwd" type="password" show-password :prefix-icon="Lock" placeholder="密码"/>
          </dv-border-box8>
        </el-form-item>
        <el-form-item>
          <el-button color="#0c4fac" class="submit" @click="submitForm(ruleFormRef)" v-loading="loading">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {FormInstance, FormRules} from "element-plus";
import {User, Lock, Tools} from "@element-plus/icons-vue";
import {login} from "../../api/login";
import {Message} from "../../utils/message";
import {setCookie} from "../../utils/cookie";
import {nextFocus} from "../../utils/next-focus.ts";
import {BorderBox8 as DvBorderBox8} from '@kjgl77/datav-vue3'


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

// 密码框的ref
const pwd = ref<any>()

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
  height: 100vh;
  position: relative;
  /*background: url("../../assets/background.jpg") no-repeat center 0 / cover;*/
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: scaleForm 0.7s linear forwards;
}

@keyframes scaleForm {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.h-icon {
  animation: moveIcon 3s linear forwards, rotationIcon 1s 3s linear infinite;
}

.h-icon:hover {
  animation-play-state: paused;
}

@keyframes moveIcon {
  0% {
    transform: translate(0, -500px) rotate(0deg);
  }
  50% {
    transform: translate(0, 0) rotate(360deg);
  }
  55% {
    transform: translate(18px, 0) rotate(450deg);
  }
  60% {
    transform: translate(10px, 0) rotate(410deg);
  }
  65% {
    transform: translate(4px, 0) rotate(380deg);
  }
  70% {
    transform: translate(0, 0) rotate(360deg);
  }
  75% {
    transform: translate(8px, 0) rotate(400deg);
  }
  80% {
    transform: translate(3px, 0) rotate(375deg);
  }
  85% {
    transform: translate(0, 0) rotate(360deg);
  }
  90% {
    transform: translate(3px, 0) rotate(375deg);
  }
  95% {
    transform: translate(1px, 0) rotate(365deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

@keyframes rotationIcon {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.title {
  text-align: center;
  margin-right: 10px;
  background: linear-gradient(to right, #dd48e8, #4ec5f8, #5af1d8);
  background-clip: text;
  color: transparent;
  animation: moveTitle 1.4s linear forwards;
}

@keyframes moveTitle {
  from {
    transform: translate(-1000px, 0) skew(0deg);
  }
  to {
    transform: translate(0, 0) skew(-20deg);
  }
}

.input {
  height: 50px;
  border-radius: 5px;
  --el-input-border-color: none;
  background: rgba(27, 41, 71, 0.3);
  backdrop-filter: blur(20px);
}

.submit {
  width: 100%;
  height: 44px;
  opacity: 0.5;
}

.submit:hover {
  opacity: 1;
  box-shadow: 2px 2px 10px skyblue, 3px 3px 15px white;
}
</style>