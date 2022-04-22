<!--
 * @Author: TengLong
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-22 11:13:59
 * @LastEditors: TengLong
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\components\Calculator.vue
-->
<template>
  <div class="calculator">
    <h3 class="title">"{{ store.state.city }}"五险一金及税后工资计算器</h3>
    <div>
      <span>税前工资：</span>
      <input
        type="text"
        placeholder="税前工资"
        class="form-control"
        v-model.number="wageReactive.gross"
        @keydown="inputHandler"
      />
    </div>
    <div>
      <span>到手工资：</span>
      <input
        type="text"
        placeholder="到手工资"
        class="form-control"
        v-model.number="wageReactive.take"
        @keydown="inputHandler"
      />
    </div>
    <div class="row calculator-btn">
      <button class="col-sm btn btn-success" @click="toComputeHandler">
        计算
      </button>
      <button class="col-sm btn btn-danger" @click="initData">重新计算</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import Wage from "../model/Wage";
export default defineComponent({
  name: "CaculatorComponent",
  setup(props, context): unknown {
    // 工资数据
    let wage: Wage = new Wage();
    let wageReactive = reactive(wage);
    // 城市数据
    let store = useStore();
    // 计算按钮handler
    let toComputeHandler: () => void = (): void => {
      context.emit("compute", wage);
    };
    // 重新计算
    let initData: () => void = (): void => {
      wageReactive.gross = undefined;
      wageReactive.take = undefined;
      context.emit("initdata");
    };
    // 数据输入handler
    let inputHandler: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
      let value: string = (e.target as HTMLInputElement).value;
      wage.validator(value + e.key) || e.key === "Backspace"
        ? void 0
        : e.preventDefault();
    };

    return {
      wageReactive,
      inputHandler,
      toComputeHandler,
      initData,
      store,
    };
  },
});
</script>

<style scoped>
.calculator {
  padding: 15px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid rgba(230, 230, 230);
  border-radius: 3px;
}

.title {
  line-height: 40px;
}

.calculator input {
  margin: 15px 0 20px;
}

.calculator-btn {
  margin: 0 10px;
}

.calculator-btn button {
  margin: 0 15px;
}
</style>
