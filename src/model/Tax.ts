/*
 * @Author: Striver-TL
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-24 10:24:40
 * @LastEditors: Striver-TL
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\model\Tax.t
 */

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


export default Tax