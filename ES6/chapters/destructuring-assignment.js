// 变量的解构赋值
var [a, b, c] = [1, 2, 3];
console.log(a);
console.log(b);
console.log(c);

let [x, ...y] = [1, 2, 3, 4];
// y = [2, 3, 4]
console.log(y);

// var [bar, foo] = [1];
// 解构不成功 值等于undefined
// console.log(foo);

// 生成器 详见generator
function* fibs(){
    var a = 0;
    var b = 1;
    while(true){
        yield a;
        [a, b] = [b, a+b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log('sixth: ', sixth);

// defalut value the condition is the value === undefined;
function f(){
    console.log('from: f()');
    return 'f';
}

let [z=f()] = [];
console.log('z: ', z);
// let z;
// if([1][0] === undefined){
//     z = f();
// }else{
//     z = [1][0];
// }

// 对象的解构赋值 
var {foo: baz} = {foo: 'aaa', bar: 'bbb'};
console.log('baz: ', baz);

let obj = {};
let arr = [];
({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});

let {log, sin, cos} = Math;
console.log('Math: ', log, sin, cos);

// 字符串的解构赋值
var result = [[1, 2], [3, 4]].map(([a, b]) => a + b);
console.log(result);

// 函数参数指定默认值
function move({x = 0, y = 0} = {}){
    return [x, y];
}

var result2 = move({x: 3});

console.log(result2);

// ## 解构赋值的用途
// ### 1. 遍历map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for(let [key, value] of map){
    console.log(key + ' is ' + value);
}

// ### 2. 输入模块的指定方法
// const {sourceMapConsumer, SourceNode} = require('source-map');