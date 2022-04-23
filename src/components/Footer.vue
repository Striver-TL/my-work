<!--
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-23 17:54:52
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-23 18:10:45
 * @Description: file conten
-->

<template>
  <div :class="isBottom ? 'footer bottom' : 'footer'">
    <div class="container">
      <span>Copyright(c)2018&nbsp;newer&nbsp;版权所有</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FooterComponent",
  setup() {
    const isBottom = ref(true);
    const resizeFunc = () => {
      isBottom.value = document.body.clientHeight < window.innerHeight;
    };
    resizeFunc();
    window.addEventListener("resize", resizeFunc, false);
    return {
        isBottom
    }
  },
});
</script>

<style scoped>
.footer {
  padding-top: 10px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background: #007bff;
}

.bottom {
  position: fixed;
  bottom: 0%;
  left: 0%;
  width: 100%;
}
</style>
