/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-23 14:32:35
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-24 13:08:21
 * @Description: file content
 */

import WageData from './WageData';
import Operation from './Operation';
import { personalTax, companyTax } from '@/data/taxData';

class WageCompute {
    static {
        // 存储个人所得税缴纳比例区间（基于到手工资）
        personalTax.incomeTaxReverse = personalTax.incomeTax.map(e => {
            const item = e.concat();
            // 计算扣除五险一金后工资
            // 等价于： deduct = (1 - this.endowment - this.medical - this.unemployment - this.injury - this.maternity - this.housing) * item[0]
            const deduct = Operation.mul(Operation.sub(1, personalTax.endowment, personalTax.medical, personalTax.unemployment, personalTax.injury, personalTax.maternity, personalTax.housing), item[0]);
            // 计算到手工资
            item[0] = Operation.sub(deduct, Operation.mul(deduct, item[1]), -item[2]);
            return item;
        });
        const infinity: Array<number> = [Infinity];
        // 添加边界（避免超出区间）
        personalTax.incomeTax.push(infinity);
        personalTax.incomeTaxReverse.push(infinity);
    }

    /**
     * 通过税前工资计算
     * @author Striver-TL
     * @param wageData 税额数据对象
     * @param money 税前工资
     * @returns { WageData } 计算后的税额数据对象
     */
    static computeBefore(wageData: WageData, money: number): WageData {
        // 计算五险一金的税额
        const { personal, company } = wageData.tax;
        // 个人总税额
        let personalTotal = 0;
        // 企业总税额
        let companyTotal = 0;
        // 遍历所有缴费项目
        let key: keyof typeof company;
        for (key in company) {
            // 计算个人的该缴费项目
            personal[key] = Operation.mul(personalTax[key], money);
            // 累加个人总税额
            personalTotal = Operation.add(personalTotal, personal[key]);
            // 计算单位的该缴费项目
            company[key] = Operation.mul(companyTax[key], money);
            // 累加单位总税额
            companyTotal = Operation.add(companyTotal, company[key]);
        }
        // 保存累加完毕的个人总税额
        wageData.companyTotal = companyTotal;
        // 保存累加完毕的单位总税额
        wageData.personalTotal = personalTotal;
        // 总纳税
        wageData.totalTax = Operation.add(companyTotal, personalTotal)
        // 计算其它税额
        wageData.deduct = Operation.sub(money, personalTotal);
        // 计算个人所得税
        // 确立区间
        const { incomeTax } = personalTax;
        for (let i = 0; i < incomeTax.length - 1; i ++) {
            if (wageData.deduct >= incomeTax[i][0] && wageData.deduct < incomeTax[i + 1][0]) {
                const item = incomeTax[i];
                // 计算个人所得税
                wageData.incomeTax = Operation.sub(Operation.mul(wageData.deduct, item[1]), item[2]);
                break;
            }
        }
        // 计算到手工资
        wageData.handWages = Operation.sub(wageData.deduct, wageData.incomeTax);
        // 返回数据
        return wageData;
    }

    /**
     * 通过到手工资计算
     * @param wageData 税额数据对象
     * @param money 到手工资
     * @returns { WageData } 计算后的税额数据对象
     * @author Striver-TL
     */

    static computeAfter(wageData: WageData, money: number): WageData {
        // 税前工资
        let before = 0;
        // 获取基于到手工资的个人所得税税率数据
        const { incomeTaxReverse } = personalTax;
        // 遍历数据确定区间并计算
        for (let i = 0; i < incomeTaxReverse.length - 1; i ++) {
            // 如果是该区间
            if (money >= incomeTaxReverse[i][0] && money < incomeTaxReverse[i + 1][0]) {
                // 获取本区间税率数据
                const item = incomeTaxReverse[i];
                // 扣除五险一金后工资与到手工资比例
                const ratio = Operation.sub(1, item[1]);
                // 计算扣除五险一金后工资
                // 公式：(到手工资 - 速算扣除数) / 扣除五险一金后工资与到手工资比例
                before = Operation.div(Operation.sub(money, item[2]), ratio);
                break;
            }
        }
        // 计算税前工资
        // 公式： 扣除五险一金后工资 / 扣除五险一金后工资与税前工资比例
        before = Operation.div(before, Operation.sub(1, Operation.add(personalTax.endowment, personalTax.housing, personalTax.injury, personalTax.maternity, personalTax.medical, personalTax.unemployment)));
        wageData.beforeMoney = before;
        // 根据税前工资计算
        return this.computeBefore(wageData, before);
    }
}

export default WageCompute;
