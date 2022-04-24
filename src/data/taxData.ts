/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-24 10:23:00
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-24 10:41:34
 * @Description: file content
 */

import Tax from '@/model/Tax';

class PersonalTax extends Tax {
    // 养老保险缴纳比例
    endowment = 0.08;
    // 医疗保险缴纳比例
    medical = 0.02;
    // 失业保险缴纳比例
    unemployment = 0.003;
    // 工伤保险缴纳比例
    injury = 0;
    // 生育保险缴纳比例
    maternity = 0;
    // 住房公积金缴纳比例
    housing = 0.1;
    // 个人所得税缴纳比例（基于税前工资）
    incomeTax: Array<Array<number>> = [
        // 区间表示税率
        // 0：该区间税率的起始税前工资
        // 1：该区间的税率
        // 2：速算扣除数
        [0, .03, 0],
        [36000, .1, 2520],
        [144000, .2, 16920],
        [300000, .25, 31920],
        [420000, .3, 52920],
        [660000, .35, 85920],
        [960000, .45, 181920]
    ];
    // 个人所得税缴纳比例区间（基于到手工资）
    incomeTaxReverse: Array<Array<number>> = [];
    constructor() {
        super();
    }
}

class CompanyTax extends Tax {
    // 养老保险缴纳比例
    endowment = 0.19;
    // 医疗保险缴纳比例
    medical = 0.08;
    // 失业保险缴纳比例
    unemployment = 0.007;
    // 工伤保险缴纳比例
    injury = 0.007;
    // 生育保险缴纳比例
    maternity = 0.007;
    // 住房公积金缴纳比例
    housing = 0.1;
}

export const personalTax = new PersonalTax();
export const companyTax = new CompanyTax();
