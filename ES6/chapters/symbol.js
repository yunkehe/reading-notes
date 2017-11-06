// Javascript第七种数据类型
let s = Symbol();

let obj = {};

obj[s] = 'hello';
obj['name'] = 'world';

let obj2 = {
    [s]: 'hello'
}

Object.defineProperty(obj, s, {value: 'hello'});

console.log('obj.s', obj.s);
// 不能使用点运算符
console.log('obj[s]', obj[s]);

console.log('getOwnPropertyNames', Object.getOwnPropertyNames(obj));
console.log('getOwnPropertySymbols', Object.getOwnPropertySymbols(obj));

// 
console.log('Reflect.ownKeys', Reflect.ownKeys(obj) );

for(let i in obj){
    console.log('for..in symbol', i);
}

// 用途
// 1. 运用到switch语句中
// 2. 消除魔术字符串
const shapeType = {
    triangle: Symbol()
}

function getArea(shape, options) {
    switch(shape){
        case shapeType.triangle:
        console.log('case triangle');
        break;
    }
}

getArea(shapeType.triangle);

console.log('symbol: ', shapeType.triangle);

var size = Symbol('size');

class Collection{
    constructor(){
        this[size] = 0;
    }

    add(item){
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance){
        return instance[size];
    }
}

var x = new Collection();
var y = new Collection();
console.log('x[size]', x[size] );
console.log('y[size]', y[size] );
console.log('Collection.sizeOf', Collection.sizeOf(x) );
x.add('foo');
console.log('Collection.sizeOf', Collection.sizeOf(x) );
console.log('x[size]', x[size] );
console.log('y[size]', y[size] );

// 使用同一个Symbol值
var s1 = Symbol.for('size');
// Symbol.keyFor(s1) === 'size';

// 属性名的遍历
// Symbol作为属性名 不会出现在for..in for...of循环中 也不会被Object

// #### #### #### #### 总结
// 返回对象属性名的方法
// 返回对象symbol类型属性名的方法
// 返回对象所有属性名的方法
// iframe窗口生成的Symbol值可以在主页面得到
// 内置Symbol值
// 1. Symbol.isConcatSpreadable 
// var arr = [1, 2]; 
// arr[Symbol.isConcatSpreadable] = false;
// [3, 4].concat(arr) 结果是 [3, 4, [1, 2]]
// Symbol.species
class MyArray extends Array {
  // 覆盖 species 到父级的 Array 构造函数上
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array);   // true

// Symbol.match
class MyMatcher{
    [Symbol.match](string){
        return 'hello world'.indexOf(string);
    }
}

console.log('Symbol.match: ', 'e'.match(new MyMatcher()));

// 同样的还有 Symbol.replace, Symbol.search, Symbol.split

// Symbol.iterator 详见iterator
// Symbol.toPrimitive
// 对象被转为原始类型的值时会调用
let obj4 = {
    [Symbol.toPrimitive](hint){
        switch (hint){
            case 'number':
                console.log('number obj4');
                return 123;
            case 'string':
                console.log('string');
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
}
console.log('toPrimitive: ', 2*obj4);
console.log('toPrimitive: ', 3 + obj4);
console.log('toPrimitive: ', obj4 === 'default');

// Symbol.toStringTag
console.log('Symbol.toStringTag: ', {[Symbol.toStringTag]: 'Foo'}.toString());
console.log('Symbol.toStringTag: ', {}.toString());

// Symbol.unscopables
console.log('with环境会被排除的属性', Object.keys(Array.prototype[Symbol.unscopables]) )