/*
 * @Author: TengLong
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-22 11:12:46
 * @LastEditors: TengLong
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\model\Tax.ts
 */
interface Tax {
    endowment: number;
    medical: number;
    unemployment: number;
    injury: number;
    maternity: number;
    housing: number;
}

class PersonalTax implements Tax {
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
    // 个人所得税缴纳比例
    incomeTax: Array<Array<number>> = [
        // 区间表示税率
        // 
        [0, 0.03, 0],
        [36000, 0.1, 2520],
        [144000, 0.2, 16920],
        [300000, 0.25, 31920],
        [420000, 0.3, 52920],
        [660000, 0.35, 85920],
        [960000, 0.45, 181920]
    ]
}

class CompanyTax implements Tax {
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

export const personalTax: PersonalTax = new PersonalTax();
export const companyTax: CompanyTax = new CompanyTax();