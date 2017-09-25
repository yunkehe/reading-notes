// 函数的默认值
function foo({x, y=1}) {
    console.log('x, y: ', x, y);
}

foo({x: 5, y: 6});

function m1({x = 0, y = 0} = {}){
    return [x, y];
}

function m2({x, y} = {x: 0, y: 0}){
    return [x, y];
}

console.log( m1({x: 3}) );
console.log( m2({x: 3}) );

// length属性返回没有指定默认值的参数个数
console.log('length: ',  (function(a){}).length );
console.log('length: ', (function(a=1){}).length );
console.log('length: ', (function(a, b, c=1){}).length );

let x = 1;

function f(y = x){
    let x = 2;
    console.log('y: ', y);
}

f(); // 调用时，y的默认值变量x尚未在函数内部生成，所以x指向全局变量。


let foo2 = 'outer';

function bar(func = x => foo2){
    let foo2 = 'inner';
    console.log(func()); // outer
}

// function bar(func = function(x){ return foo;}){
//     let foo = 'inner';
//     console.log(func()); // outer
// }

bar();

function throwIfMissing(){
    throw new Error('Missing parameter');
}

function foo3(mustBeProvided = throwIfMissing()){
    return mustBeProvided;
}

// foo3(); // 参数必须传递

//  rest参数
const sortNumbers = () => Array.prototype.slice.call(arguments).sort();
const sortNumbers2 = (...numbers) => numbers.sort();

// 扩展运算符 ...将一个数组变为参数序列
console.log(1, ...[2, 3, 4], 5);

console.log('求最大值：', Math.max(...[14, 3, 27]));

console.log('ES5 new Date变通方法', new (Date.bind.apply(Date, [null, 2015, 1, 2])));
console.log('Date: ', new Date(...[2015, 1, 2])); 

// 扩展运算符的应用
// 合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

arr1.concat(arr2, arr3);
[...arr1, ...arr2, ...arr3];

// 与解构赋值结合
// a = list[0], rest = list.slice(1);
// [a, ...rest] = list; //扩展运算符只能放在参数最后一位
// [a, ...rest, b] = list; //扩展运算符只能放在参数最后一位

// 字符串
let str = 'x\uD83D\uDE80y';
console.log('str: ', str);
console.log( str.split('').reverse().join('') );
console.log( [...str].reverse().join('') );
