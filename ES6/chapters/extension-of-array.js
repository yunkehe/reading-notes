// Array.from();  // 类数组对象转为真正的数组
// 第一个参数类数组对象
// 第二个参数, map方法
// 第三个参数, map方法中的this指向

function foo() {
	var args = [...arguments];

	console.log('arguments: ', arguments);
	console.log('args: ', args);
	console.log('Array.from: ', Array.from(arguments, x => x*x) );
}

foo(2, 3, 4);

// Array.of 将一组值转换为数组

// 数组实例的copyWithin()方法
var ss = [].copyWithin.call({length: 5, 3: 1}, 0, 3); //
console.log('ss: ', ss);

// 数组实例的find和findIndex方法
var r2 = [{name: 'heke'}, {name: 'yunkehe'}].find(x => x.name === 'heke');
var r3 = [{name: 'heke'}, {name: 'yunkehe'}].findIndex(x => x.name === 'heke');
console.log('r2: ', r2);
console.log('r3: ', r3);

console.log( [NaN].indexOf(NaN) ); // -1;

console.log( [NaN].findIndex(x => Object.is(NaN, x)) ); // 0

// 数组实例的fill方法 填充空数组
// entries(), keys(), values() 
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value);
console.log(entries.next().value);
console.log(entries.next().value);
console.log(entries.next().value);

// includes是否包含某个值
// 数组的空位 0 in [4, 3]
// 0 in [, 3]

// 数组的空位 各个方法处理方式不太一样

// 数组推导 

function caculate(times) {
	let i = 0;
	while (i < times) i++;
}

function log(fn) {
	return function(...args) {
		const start = Date.now();
		fn(...args);
		const used = Date.now() - start;
		console.log(`call ${fn.name} {${args}} used ${used}ms`);
	}
}

caculate = log(caculate);
caculate(1000);
caculate(100000);

