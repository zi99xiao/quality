<template>
  <div class="container">
    <canvas id="canvas" height="100vh" width="100vw">
      您的浏览器不支持绘图
    </canvas>
    <span><strong>嘿</strong>！亲爱的用户，你是不是走错路了，我找不到页面呀</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
  height: calc(100vh - 32px);
  width: calc(100% - 32px);
  padding: 16px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  background: linear-gradient(to right, #000000, #e8e7e7, #fa00d1);
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: shake 5s linear infinite;
}

@keyframes shake {
  0% {
    transform: translateY(0) translateX(50px);
  }
  25% {
    transform: translateY(50px) translateX(0);
  }
  50% {
    transform: translateY(0) translateX(-50px);
  }
  75% {
    transform: translateY(-50px) translateX(0);
  }
  100% {
    transform: translateY(0) translateX(50px);
  }
}
</style>