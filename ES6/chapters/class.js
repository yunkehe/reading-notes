// 类
let methodName = 'getArea';
const Point = class P {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getClassName() {
        return P.name;
    }

    toString() {
        return '(' + this.x + ', ' + this.y +')';
    }

    [methodName]() {

    }
}

// 类的所有方法都定义在prototype属性上
Point.prototype.constructor === Point;
// 类的内部定义的所有方法都是不可枚举的，与ES5不一致
console.log('prototype: ', Object.keys(Point.prototype));

let p1 = new Point();
// name属性
console.log('name: ', p1.getClassName());

// class不存在变量提升

// class的继承
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 必须调用super方法 this才可以使用
        this.color = color;
    }


}

let cp1 = new ColorPoint(3, 2);

console.log('extends: ', ColorPoint.prototype.__proto__ === Point.prototype);
console.log('extends: ', ColorPoint.__proto__ === Point);
console.log('getPrototypeOf: ', Object.getPrototypeOf(ColorPoint) === Point);

// 原生构造函数的继承
// ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this。
// 带版本的数组
class VersionArray extends Array {
    constructor() {
        super();
        this.history = [[]];
    }

    commit() {
        this.history.push(this.slice());
    }

    revert() {
        this.splice(0, this.length, ...this.history[this.history.length-1]);
    }
}

// class的取值和存值函数
// 存值和取值函数是设置在属性的descriptor对象上的
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }

    static method() {
        return 'hello';
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, 'html');
console.log('get: ', 'get' in descriptor);
console.log('set: ', 'set' in descriptor);

// Generator方法

// class的静态方法 
// 父类的静态方法可以被子类继承
// 静态方法也可以从super上调用

CustomHTMLElement.static_prop = 1;

// new.target属性
function Person(name) {
    if(new.target !== undefined){
        this.name = name;
    }else{
        throw new Error('必须使用new生成实例');
    }
}

var person = new Person('张三');
var person = Person.call(person, '张三');

// Mixin模式
function copyProperties(target, source) {
    for(let key of Reflect.ownKeys(source)) {
        if(key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
            ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}