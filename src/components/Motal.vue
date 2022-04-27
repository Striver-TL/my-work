<!--
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-24 12:10:39
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-27 14:03:02
 * @Description: file content
-->

<template>
  <div class="motal" v-show="show">
    <div class="motal-box">
      <div class="motal-title">
        <slot name="title"></slot>
      </div>
      <div class="motal-content">
        <slot name="content" :close="close"></slot>
      </div>
      <div class="motal-close">
        <button @click="close"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MotalComponent",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(prop, context) {
    return {
      close() {
        context.emit("close");
      },
    };
  },
});
</script>

<style scoped>
.motal {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
}

.motal-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 40px 40px 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.motal-title {
  text-align: center;
  line-height: 40px;
  margin: 20px 0;
}

.motal-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.motal-close button {
  display: block;
  width: 30px;
  height: 30px;
  background: url("/public/images/x.svg") 0 no-repeat;
  background-size: cover;
  border: none;
  border-radius: 50%;
}
</style>
