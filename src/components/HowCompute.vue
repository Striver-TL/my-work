<!--
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-24 12:36:50
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-27 14:06:03
 * @Description: file content
-->

<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>缴费项目</th>
        <th>计算公式</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>个人五险一金</td>
        <td>税前工资&nbsp;*&nbsp;缴纳比例</td>
      </tr>
      <tr>
        <td>单位五险一金</td>
        <td>税前工资&nbsp;*&nbsp;缴纳比例</td>
      </tr>
      <tr>
        <td>个人总纳税</td>
        <td>个人五险一金总和</td>
      </tr>
      <tr>
        <td>单位总纳税</td>
        <td>单位五险一金总和</td>
      </tr>
      <tr>
        <td>总纳税</td>
        <td>个人总纳税&nbsp;+&nbsp;单位总纳税</td>
      </tr>
      <tr>
        <td>扣除五险一金后工资</td>
        <td>税前工资&nbsp;-&nbsp;个人总纳税</td>
      </tr>
      <tr>
        <td>个人所得税</td>
        <td>扣除五险一金后工资&nbsp;*&nbsp;缴纳比例&nbsp;-&nbsp;速算扣除数</td>
      </tr>
      <tr>
        <td>到手工资</td>
        <td>扣除五险一金后工资&nbsp;-&nbsp;个人所得税</td>
      </tr>
    </tbody>
  </table>
  <h5 style="text-align: center">个人所得税</h5>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>级数</th>
        <th>累计预缴应纳税所得额</th>
        <th>缴纳比例（%）</th>
        <th>速算扣除数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in incomeTax" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item[0] }}</td>
        <td>{{ item[1] * 100 }}</td>
        <td>{{ item[2] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { personalTax } from "@/data/taxData";
export default defineComponent({
  name: "HowCompute",
  setup() {
    return {
      incomeTax: personalTax.incomeTax.slice(
        0,
        personalTax.incomeTax.length - 1
      ),
    };
  },
});
</script>

<style scoped>
table.table {
  width: 600px;
  font-size: 10px;
}

.table td {
  padding: 0;
}

tbody tr:nth-child(2n-1) {
  background: rgb(242, 242, 242);
}
</style>
