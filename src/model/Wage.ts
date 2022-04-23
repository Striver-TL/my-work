/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-22 18:28:33
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-23 17:56:02
 * @Description: file content
 */
class Wage {
  // grossType 和 takeType的作用是用来区分输入的是哪个数据
  // 税前工资的id
  grossType = 1;
  // 到手工资的id
  takeType = 2;
  // 税前工资
  gross: number | string = '';
  // 实际工资
  take: number | string = '';
  // 数据验证器（数字）
  validator(string: string): boolean {
    return /^\d+\.?\d*$/g.test(string);
  }
}

export default Wage;
