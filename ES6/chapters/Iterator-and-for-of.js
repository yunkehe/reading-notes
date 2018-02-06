// Iterator概念
// Iterator接口主要供for...of消费
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ? 
                {value: array[nextIndex++]} :
                {done: true}
        }
    }
}

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log('iter: ', iter.next());

class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if( value < this.stop ){
            this.value++;
            return {done: false, value: value};
        }else{
            return {done: true, value: undefined};
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for(var value of range(0, 4)){
    console.log('value: ', value);
}

// 类数组解构部署Iterator接口
// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

let set = new Set().add('a').add('b').add('c');
let [first, ...rest] = set;
console.log('解构赋值', rest);

let generator = function* () {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
}

var iterator = generator();

console.log('yield* ', iterator.next())

// 字符串的Iterator接口 
var someStr = 'hi';
console.log('string iterator 接口', typeof someStr[Symbol.iterator]);

// Iterator接口与Generator函数
var myIterator = {};

myIterator[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}

// [...myIterator]; // [1, 2, 3]

let obj = {
    * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
}

for(let x of obj){
    console.log('x: ', x);
}

// 数组的遍历器接口只返回具有数字索引的属性
// 这一点跟 for in 不一样
let arr2 = [3, 5, 7];
arr2.foo = 'hello';

for(let i in arr2){
    console.log('for in', i);
}

for(let i of arr2){
    console.log('for of', i);
}

// Set 和 Map 结构
var es6 = new Map();
es6.set('edition', 6);
es6.set('committee', 'TC39');
es6.set('standard', 'ECMA-262');

for(var [name, value] of es6){
    console.log('Map: ', name + ': ' + value);
}

// 对于字符串来说，for...of循环还有一个特点，就是会正确识别32位UTF-16字符
// jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
let arr3 = [1, 2, 3, 4, 5];
for(let x of arr3){
    if(x > 3){
        break;
    }
    console.log('x: ', x);
}

// 如果在Generator函数内部调用另一个Generator函数，默认情况下是没有效果的
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield 'y';
}

for(let v of bar()){
    console.log('v: ', v);
}

function* bar2(){
    yield 'x';
    yield* foo();
    yield 'y';
}

for( let v of bar2()){
    console.log('v2: ', v);
}

// yield 语句等同于在Generator函数内部部署一个for...of循环
// 任何数据结构只要有Iterator接口，就可以用yield*遍历
