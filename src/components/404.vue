<template>
  <div class="container">
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
  background: linear-gradient(skyblue 0%, white 20%, #00805e 100%);
}

span {
  display: inline-block;
  animation: shake 2s ease-in-out infinite;
}

/* Keyframes for the shaking effect */
@keyframes shake {
  0% { transform: translateY(0); }
  20% { transform: translateY(-5px); }
  40% { transform: translateY(5px); }
  60% { transform: translateY(-5px); }
  80% { transform: translateY(5px); }
  100% { transform: translateY(0); }
}
</style>