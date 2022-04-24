/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-22 18:28:33
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-24 10:21:18
 * @Description: file content
 */
class PowNum {
    numbers: Array<number>;
    index: number;
    constructor(numbers: Array<number>, index: number) {
        this.numbers = numbers;
        this.index = index;
    }
}

// 此类中包含的方法是用于解决js中小数计算偏差的方法
class Operation {
    private static _Math: Math = Math;
    // 获取小数点位数
    private static getLength(num: number): number {
        const arr: Array<string> = num.toString().split(".");
        if (arr[1]) {
            return arr[1].split("").length;
        } else return 1;
    }

    private static getLengthAll(...args: any[]): Array<number> {
        const arr: Array<number> = [];
        args.forEach(e => {
            arr.push(this.getLength(e));
        });
        return arr;
    }


    // 转化为整数
    private static toPow(...args: any[]): PowNum {
        const length: Array<number> = this.getLengthAll(...args);
        const pows: Array<number> = length.map(e => this._Math.pow(10, e + 1));
        const max = this._Math.max(...pows);
        const numbers: Array<number> = [];
        args.forEach((e, index) => {
            numbers.push(e * pows[index] * (max / pows[index]));
        });
        return new PowNum(numbers, max);
    }
    // 加法计算
    static add(...args: any[]): number {
        const d: PowNum = this.toPow(...args);
        return d.numbers.reduce((a: number, b: number) => {
            return a + b;
        }) / d.index;
    }
    // 减法计算
    static sub(...args: any[]): number {
        const d: PowNum = this.toPow(...args);
        return d.numbers.reduce((a: number, b: number) => {
            return a - b;
        }) / d.index;
    }
    // 乘法计算
    static mul(...args: any[]): number {
        const d: PowNum = this.toPow(...args);
        return d.numbers.reduce((a: number, b: number) => {
            return a * b;
        }, 1) / this._Math.pow(d.index, d.numbers.length);
    }
    // 除法计算
    static div(...args: any[]): number {
        const d: PowNum = this.toPow(...args);
        return d.numbers.reduce((a: number, b: number) => {
            return a / b;
        }) * this._Math.pow(d.index, args.length - 2);
    }
}

export default Operation;