/*
 * @Author: Striver-TL
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-23 18:54:17
 * @LastEditors: Striver-TL
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\model\Tax.t
 */

import Operation from './Operation';
interface TaxInterface {
    endowment: number;
    medical: number;
    unemployment: number;
    injury: number;
    maternity: number;
    housing: number;
}

class Tax implements TaxInterface {
    endowment = 0;
    medical = 0;
    unemployment = 0;
    injury = 0;
    maternity = 0;
    housing = 0;
}
class PersonalTax implements TaxInterface {
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
    // 个人所得税缴纳比例（基于到手工资）
    incomeTaxReverse: Array<Array<number>> = [];
    constructor() {
        this.incomeTaxReverse = this.incomeTax.map(e => {
            const item = e.concat();
            // 计算扣除五险一金后工资
            // 等价于： deduct = (1 - this.endowment - this.medical - this.unemployment - this.injury - this.maternity - this.housing) * item[0]
            const deduct = Operation.mul(Operation.sub(1, this.endowment, this.medical, this.unemployment, this.injury, this.maternity, this.housing), item[0]);
            // 计算到手工资
            item[0] = Operation.sub(deduct, Operation.mul(deduct, item[1]), -item[2]);
            return item;
        });
        const infinity: Array<number> = [Infinity];
        // 添加边界
        this.incomeTax.push(infinity);
        this.incomeTaxReverse.push(infinity);
    }
}

class CompanyTax implements TaxInterface {
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

export default Tax;
export const personalTax: PersonalTax = new PersonalTax();
export const companyTax: CompanyTax = new CompanyTax();