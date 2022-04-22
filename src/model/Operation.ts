/*
 * @Author: TengLong
 * @Date: 2022-04-22 10:33:53
 * @LastEditTime: 2022-04-22 11:12:21
 * @LastEditors: TengLong
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\model\Operation.ts
 */
// 此类中记录指数和整数
class PowNum {
    index: number;
    num1: number;
    num2: number; 
    constructor(num1: number, num2: number, index: number) {
        this.num1 = num1;
        this.num2 = num2;
        this.index = index;
    }
}

// 此类中包含的方法是用于解决js中小数计算偏差的方法
class Operation {
    private _Math: Math = Math;
    // 获取小数点位数
    private getLength(num: number): number {
        const arr: Array<string> = num.toString().split(".");
        if (arr[1]) {
            return arr[1].split("").length;
        } else return 1;
    }

    // 转化为整数
    private toPow(num1: number, num2: number): PowNum {
        // 计算num1小数点位数
        const num1Length = this.getLength(num1);
        // 计算num2小数点位数
        const num2Length = this.getLength(num2);
        const index = this._Math.pow(10, num1Length >= num2Length ? num1Length : num2Length);
        return new PowNum(num1 * index, num2 * index, index);
    }
    // 加法计算
    add(num1: number, num2: number): number {
        const d: PowNum = this.toPow(num1, num2);
        return (d.num1 + d.num2) / d.index;
    }
    // 减法计算
    sub(num1: number, num2: number): number {
        const d: PowNum = this.toPow(num1, num2);
        return (d.num1 - d.num2) / d.index;
    }
    // 乘法计算
    mul(num1: number, num2: number): number {
        const d: PowNum = this.toPow(num1, num2);
        return (d.num1 * d.num2) / this._Math.pow(d.index, 2);
    }
    // 除法计算
    div(num1: number, num2: number): number {
        const d: PowNum = this.toPow(num1, num2);
        return (d.num1 / d.num2) / this._Math.pow(d.index, 2);
    }
}

export default new Operation();