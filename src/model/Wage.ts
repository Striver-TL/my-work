/*
 * @Author: TengLong
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-22 11:13:05
 * @LastEditors: TengLong
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\model\Wage.ts
 */
class Wage {
  // 税前工资
  gross: number | undefined = undefined;
  // 实际工资
  take: number | undefined = undefined;
  // 数据验证器
  validator(string: string): boolean {
    return /^\d+\.?\d*$/.test(string);
  }
}

export default Wage;
