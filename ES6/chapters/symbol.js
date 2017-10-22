// Javascript第七种数据类型
let s = Symbol();

let obj = {};

obj[s] = 'hello';

let obj2 = {
    [s]: 'hello'
}

Object.defineProperty(obj, s, {value: 'hello'});

console.log('obj.s', obj.s);
// 不能使用点运算符
console.log('obj[s]', obj[s]);

// 用途
// 1. 运用到switch语句中
// 2. 消除魔术字符串
