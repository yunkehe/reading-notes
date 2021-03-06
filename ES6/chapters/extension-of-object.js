// 对象的扩展
var foo = 'bar';
var baz = {foo};

console.log('baz: ', baz);

var o = {
    method(){
        return 'hello';
    }
}

// commonJS模块输出变量
function getItem(){};
function setItem(){};
function clear(){};

module.exports = {getItem, setItem, clear};

// 属性名简洁写法
var obj = {
    class (){},
    * m(){
        yield 'hello world';
    }
}

// 属性名表达式
let propKey = 'foo';

let obj2 = {
    [propKey]: true,
    ['a' + 'bc']: 123,
    ['say' + 'Hello'](){
        return 'hello world';
    }
};

var person = {
    sayHello(){
        console.log(this.name);
    },

    get firstName(){
        return 'Nicholas';
    }
}

console.log('person.sayHello', person.sayHello.name);
console.log('person.firstName', person.firstName.name);

var doSomething = function(){};
console.log('bound: ', doSomething.bind().name);

// Object.assign
// 1. 为对象添加属性
// 2. 为对象添加方法
// 3. 克隆对象

function clone(origin){
    return Object.assign({}, origin);
}

function clone2(origin){n
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}

// 4. 合并多个对象
// Reflect.enumerate(); 
// 返回所有for...in循环会遍历的属性
Object.getOwnPropertyDescriptor([], 'length').enumerable;


// 返回包含对象的 不可枚举属性
// Object.getOwnPropertyNames
// Reflect.ownKeys
 
// __proto__ 属性 Object.setPrototypeOf(object, prototype);
// Object.getPrototypeOf()
// 参数本身不是了 __proto__ 属性 则值为null
console.log('getPrototypeOf: ', Object.getPrototypeOf({__proto__: null}));

// Rest参数
// 浅复制
let objx = {a: {b: 1}};
let { ...x } = objx;
objx.a.b = 2;
console.log('x.a.b: ', x.a.b);
