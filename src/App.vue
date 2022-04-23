<!--
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-22 18:28:33
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-23 19:15:09
 * @Description: file content
-->
<template>
  <header>
    <TopBar />
  </header>
  <main>
    <div class="container">
      <Calculator :wageData="wage" @initdata="initData(wageData)" @compute="toCompute" />
      <WageShow :wageData="wageData" />
      <div class="how">
        <a href="javascript:void(0)" class="float-end">具体怎么算呢？</a>
      </div>
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script lang="ts">
import { reactive } from "vue";

import TopBar from "./components/TopBar.vue";
import Calculator from "./components/Calculator.vue";
import WageShow from "./components/WageShow.vue";
import Footer from "./components/Footer.vue";

import wageCompute from "./model/WageCompute";
import WageData from "./model/WageData";
import Wage from "./model/Wage";
export default {
  name: "App",
  setup(): unknown {
    let wage = reactive(new Wage());
    let wageData = reactive(new WageData());

    /**
     * 作用：清空指定对象的属性值改为undefined
     * @param { any } data 要将属性值转为undefined的对象
     *
     */
    let initData: (data: any) => void = (data: any): void => {
      // 遍历修改
      let key: keyof typeof data;
      for (key in data) {
        // 如果该属性值为对象递归清空
        // 否则转为undefined
        Object.prototype.toString.call(data[key]) === "[object Object]"
          ? initData(data[key])
          : (data[key] = undefined);
      }
    };

    initData(wageData);

    return {
      wage,
      wageData,
      initData() {
        initData(wageData);
        wage.take = "";
        wage.gross = "";
      },
      // 计算工资
      toCompute(type: number, wage: Wage) {
        if (type === wage.grossType) {
          wageCompute.computeBefore(wageData, Number(wage.gross));
          wage.take = wageData.handWages;
        } else {
          wageCompute.computeAfter(wageData, Number(wage.take));
          wage.gross = wageData.beforeMoney;
        }
      },
    };
  },
  components: {
    TopBar,
    Calculator,
    WageShow,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  padding: 40px 0;
}

main .container {
  padding: 0 100px;
}

.how a {
  text-decoration: none;
  color: #007bff;
}
</style>
