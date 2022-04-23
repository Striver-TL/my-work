/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-23 14:21:10
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-23 19:13:23
 * @Description: file content
 */

import Tax from './Tax';

// 税额类，里面存储个人与单位的五险一金税额
class TaxMoney {
    // 个人税额
    personal: Tax;
    // 单位税额
    company: Tax;
    constructor() {
        this.personal = new Tax();
        this.company = new Tax();
    }
}

// 税额类，包含所有税额信息
class WageData {
    // 税前工资
    beforeMoney = 0;
    // 五险一金税额
    tax: TaxMoney;
    // 个人共纳税
    personalTotal = 0;
    // 单位共纳税
    companyTotal = 0;
    // 总纳税
    totalTax = 0;
    // 扣除五险一金后工资
    deduct = 0;
    // 个人所得税
    incomeTax = 0;
    // 到手工资
    handWages = 0;
    constructor() {
        this.tax = new TaxMoney();
    }
}

export default WageData;
