<template>
  <div class="calculator">
    <h3 class="title">"{{ store.state.city }}"五险一金及税后工资计算器</h3>
    <div>
      <span
        >税前工资：<span class="red" v-show="wage.take === ''"
          >（编辑以税前工资进行计算）</span
        ></span
      >
      <input
        type="text"
        placeholder="税前工资"
        class="form-control"
        v-model="wage.gross"
        :disabled="wage.take != ''"
      />
    </div>
    <div>
      <span
        >到手工资：<span class="red" v-show="wage.gross === ''"
          >（编辑以到手工资进行计算）</span
        ></span
      >
      <input
        type="text"
        placeholder="到手工资"
        class="form-control"
        v-model="wage.take"
        :disabled="wage.gross != ''"
      />
    </div>
    <div class="row calculator-btn">
      <button class="col-sm btn btn-success" @click="toComputeHandler">
        计算
      </button>
      <button class="col-sm btn btn-danger" @click="initData">重新计算</button>
    </div>
    <Motal :show="showMessage" @close="closeMessage">
      <template v-slot:title>
        <h4>{{ message }}</h4>
      </template>
      <template v-slot:content>
        <button class="motal-btn btn btn-danger" @click="closeMessage">
          确定
        </button>
      </template>
    </Motal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from "vue";
import { useStore } from "vuex";
import Motal from "./Motal.vue";

import Wage from "@/model/Wage";
export default defineComponent({
  name: "CaculatorComponent",
  props: {
    wageData: {
      type: Wage,
      required: true,
    },
  },
  setup(prop, context): unknown {
    // 工资数据
    let wage = reactive(prop.wageData);
    // 城市数据
    let store = useStore();
    // 是否显示弹窗信息
    let showMessage: Ref<boolean> = ref(false);
    // 弹窗信息
    let message: Ref<string> = ref("");
    // 计算按钮handler
    let toComputeHandler: () => void = (): void => {
      // 如果没有输入数据警告退出
      if (wage.gross == "" && wage.take == "") {
        showMessage.value = true;
        message.value = "请输入税前工资或到手工资";
        return;
      }
      // 获取输入的是税前工资还是税后工资
      const type = wage.gross != "" ? wage.grossType : wage.takeType;
      // 如果输入的数据是非法的警告退出
      if (
        (type === wage.grossType && !wage.validator(wage.gross.toString())) ||
        (type === wage.takeType && !wage.validator(wage.take.toString()))
      ) {
        showMessage.value = true;
        message.value = "请输入有效的工资";
        return;
      }
      // 通知父组件进行计算
      context.emit("compute", type, wage);
    };
    // 重新计算
    let initData: () => void = (): void => {
      // 初始化数据
      // 通知父组件进行重置
      context.emit("initdata");
    };

    // 关闭弹窗方法
    let closeMessage: () => void = (): void => {
      showMessage.value = false;
      message.value = "";
    };
    return {
      wage,
      store,
      message,
      showMessage,
      toComputeHandler,
      initData,
      closeMessage,
    };
  },
  components: {
    Motal,
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

.red {
  color: #f33;
}

.motal-btn {
  display: block;
  width: 100px;
  margin: 30px auto 10px;
}
</style>
