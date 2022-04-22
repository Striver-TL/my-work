<template>
  <div class="show">
    <table class="table table-bordered">
      <thead>
        <tr class="text-center">
          <td rowspan="2" colspan="2" width="30%">缴存项目</td>
          <td colspan="2">个人部分</td>
          <td colspan="2">单位部分</td>
        </tr>
        <tr>
          <td>缴纳比例</td>
          <td>缴纳金额（元）</td>
          <td>缴纳比例</td>
          <td>缴纳金额（元）</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="5" class="text-center">五险</td>
          <td>养老保险</td>
          <td>{{ personalRatio.endowment }}</td>
          <td>
            <span>{{ tax.personal.endowment }}</span>
          </td>
          <td>{{ companyRatio.endowment }}</td>
          <td>
            <span>{{ tax.company.endowment }}</span>
          </td>
        </tr>
        <tr>
          <td>医疗保险</td>
          <td>{{ personalRatio.medical }}</td>
          <td>
            <span>{{ tax.personal.medical }}</span>
          </td>
          <td>{{ companyRatio.medical }}</td>
          <td>
            <span>{{ tax.company.medical }}</span>
          </td>
        </tr>
        <tr>
          <td>失业保险</td>
          <td>{{ personalRatio.unemployment }}</td>
          <td>
            <span>{{ tax.personal.unemployment }}</span>
          </td>
          <td>{{ companyRatio.unemployment }}</td>
          <td>
            <span>{{ tax.company.unemployment }}</span>
          </td>
        </tr>
        <tr>
          <td>工伤保险</td>
          <td>{{ personalRatio.injury }}</td>
          <td>
            <span>{{ tax.personal.injury }}</span>
          </td>
          <td>{{ companyRatio.injury }}</td>
          <td>
            <span>{{ tax.company.injury }}</span>
          </td>
        </tr>
        <tr>
          <td>生育保险</td>
          <td>{{ personalRatio.maternity }}</td>
          <td>
            <span>{{ tax.personal.maternity }}</span>
          </td>
          <td>{{ companyRatio.maternity }}</td>
          <td>
            <span>{{ tax.company.maternity }}</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">一金</td>
          <td>住房公益金</td>
          <td>{{ personalRatio.housing }}</td>
          <td>
            <span>{{ tax.personal.housing }}</span>
          </td>
          <td>{{ companyRatio.housing }}</td>
          <td>
            <span>{{ tax.company.housing }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">个人共纳税：<span>{{personalTotal}}</span></td>
          <td colspan="2">单位共纳税：<span>{{companyTotal}}</span></td>
        </tr>
        <tr>
          <td colspan="6">
            总纳税：<span>{{ totalTax }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            扣除五险一金后工资：<span>{{ deduct }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="6">个人所得税：<span>{{incomeTax}}</span></td>
        </tr>
        <tr>
          <td colspan="6">
            到手工资：<span>{{ handWages }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { personalTax, companyTax } from "../model/Tax";
export default defineComponent({
  name: "WageShow",
  props: {
    wageData: {
      type: Object,
      required: true,
      value: {},
    },
  },
  setup(prop): unknown {
    let {
        // 单位和个人缴纳的税
        tax,
        // 总纳税
        totalTax,
        // 扣除五险一金后工资
        deduct,
        // 个人所得税
        incomeTax,
        // 到手工资
        handWages,
        // 个人共纳税
        personalTotal,
        // 单位共纳税
        companyTotal,
        } = toRefs(prop.wageData);
    // 个人各税率百分比
    let personalRatio: any = {};
    // 单位各税率百分比
    let companyRatio: any = {};
    // 遍历税的比率数据转化为百分比格式
    let key: keyof typeof companyTax;
    for (key in companyTax) {
      personalRatio[key] = (personalTax[key] * 100).toFixed(2) + "%";
      companyRatio[key] = (companyTax[key] * 100).toFixed(2) + "%";
    }
    return {
      tax,
      totalTax,
      deduct,
      incomeTax,
      handWages,
      personalRatio,
      companyRatio,
      personalTotal,
      companyTotal
    };
  },
});
</script>

<style scoped>
td {
  vertical-align: middle;
}

.show .table tbody {
  border-top: none;
}

tbody > tr:nth-child(2n-1) {
  background: rgb(242, 242, 242);
}

tbody span {
  color: #333 !important;
  font-weight: bold;
}
</style>
