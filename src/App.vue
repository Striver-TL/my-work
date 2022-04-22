<template>
  <header>
    <TopBar />
  </header>
  <main>
    <div class="container">
      <Calculator @initdata="initData(wageData)" @compute="toCompute" />
      <WageShow :wageData="wageData" />
    </div>
  </main>
</template>

<script lang="ts">
import { reactive } from "vue";

import TopBar from "./components/TopBar.vue";
import Calculator from "./components/Calculator.vue";
import WageShow from "./components/WageShow.vue";
import Wage from "./model/Wage";
import { personalTax, companyTax } from "./model/Tax";
import operation from './model/Operation';
export default {
  name: "App",
  setup(): unknown {
    /**
     * @param { any } data 
     * 
     */
    let initData: (data: any) => void = (data: any): void => {
      let key: keyof typeof data;
      for (key in data) {
        if (data[key] instanceof Object) {
          initData(data[key]);
        } else {
          data[key] = undefined;
        }
      }
    };
    let wageData = reactive({
        tax: {
          // 个人纳税
          personal: {
            endowment: undefined,
            medical: undefined,
            unemployment: undefined,
            injury: undefined,
            maternity: undefined,
            housing: undefined,
          },
          // 单位纳税
          company: {
            endowment: undefined,
            medical: undefined,
            unemployment: undefined,
            injury: undefined,
            maternity: undefined,
            housing: undefined,
          },
        },
        // 个人共纳税
        personalTotal: undefined,
        // 单位共纳税
        companyTotal: undefined,
        // 总纳税
        totalTax: undefined,
        // 扣除五险一金后工资
        deduct: undefined,
        // 个人所得税
        incomeTax: undefined,
        // 到手工资
        handWages: undefined,
      } as any);
    // 计算程序
    let toCompute: (wage: Wage) => void = (wage: Wage): void => {
      if (!wage) return;
      let gross: number = wage.gross === undefined ? 0 : wage.gross as number;
      // key 为缴纳比例对象中的缴税项的key
      let key: keyof typeof companyTax;
      let tax = wageData.tax;
      wageData.personalTotal = wageData.companyTotal = 0;
      for (key in companyTax) {
        // 计算出个人的当前税缴纳金额
        tax.personal[key] = operation.mul(personalTax[key], gross);
        // 计算出单位的当前税缴纳金额
        tax.company[key] = operation.mul(companyTax[key], gross);
        // 累加缴纳的税
        wageData.personalTotal = operation.add(wageData.personalTotal, tax.personal[key]);
        wageData.companyTotal = operation.add(wageData.companyTotal, tax.company[key]);
      }
      // 总缴纳的税为个人总缴纳+单位总缴纳
      wageData.totalTax = operation.add(wageData.personalTotal, wageData.companyTotal);
      // 扣除五险一金后的工资
      wageData.deduct = operation.sub(gross, wageData.personalTotal);
      // 计算个人所得税
      let item: Array<number>;
      let next: Array<number>;
      let length = personalTax.incomeTax.length;
      wageData.incomeTax = 0;
      for (let i = 0; i < length; i++) {
        item = personalTax.incomeTax[i];
        next = i + 1 > length - 1 ? [Infinity] : personalTax.incomeTax[i + 1];
        // 确定税前工资在哪个区间里
        if (wageData.deduct > item[0] && wageData.deduct < next[0]) {
          // 公式：税前工资 * 该区间税率 - 
          wageData.incomeTax = operation.sub(operation.mul(wageData.deduct, item[1]), item[2]);
          break;
        }
      }
      // 计算到手工资
      wageData.handWages = operation.sub(wageData.deduct, wageData.incomeTax);
    };
    return {
      toCompute,
      wageData,
      initData
    };
  },
  components: {
    TopBar,
    Calculator,
    WageShow,
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
  padding-top: 38px;
}

main .container {
  padding: 0 100px;
}
</style>
