// Generator函数
function* helloworld() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloworld();

console.log(hw.next());
console.log(hw.next());

// yield 与 return语句的区别
// yield 不能用在普通函数中
var flat = function* (a) {
	var length = a.length;
	for(var i=0; i<a.length; i++){
		var item = a[i];
		if(typeof item !== 'number'){
			yield* flat(item);
		}else{
			yield item;
		}
	}
}

let arr = [1, [2, [3, 4]], [5, 6]];
for( let f of flat(arr)){
	console.log('f: ', f);
}

// next方法的参数
// 第一次使用next方法时不能带参数
function wrapper(generatorFun) {
	return function (...args) {
		let generatorObj = generatorFun(...args);
		generatorObj.next();
		return generatorObj;
	}
}

const wrapped = wrapper(function* () {
	console.log(`First input: ${yield}`);
	return 'DONE';
})

wrapped().next('hello');

// for...of循环 自动遍历Generator函数 且此时不再需要调用next方法
function* fibonaci() {
	let [prev, curr] = [0, 1];
	for(;;){
		[prev, curr] = [curr, prev + curr];
		yield curr;
	}
}
for(let n of fibonaci()){
	if(n > 100) break;
	console.log('n', n);
}

function* objectEntries() {
	let propKeys = Object.keys(this);

	for(let propKey of propKeys){
		yield [propKey, this[propKey]];
	}
}

let jane = {first: 'Jane', last: 'Doe'};
jane[Symbol.iterator] = objectEntries;

for( let [key, value] of jane){
	console.log(`${key}: ${value}`);
}

// Generator.prototype.throw();
// Generator.prototype.return();
// 如果Gnerator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完后再执行

function* gen(){
	yield 1;
	yield 2;
	yield 3;
}

var g = gen();
console.log('gen: ', g.next());
console.log('gen: ', g.return('foo'));
console.log('gen: ', g.next());

// generator函数的 this 
function* F() {
	yield this.x = 2;
	yield this.y = 3;
}
// new F error
// console.log('new F: ', 'next' in (new F()) );

var obj = {};
var f = F.bind(obj)();

console.log('f.next(): ', obj);
console.log('f.next(): ', f.next());
console.log('f.next(): ', obj);
console.log('f.next(): ', f.next());
console.log('f.next(): ', f.next());
console.log('f.next(): ', obj);

// ES7 Generator函数推导
let bigArray = new Array(10000);
for(let i = 0; i < 10000; i++) {
	bigArray[i] = i;
}
let first = bigArray.map(n => n * n)[0];
console.log(first);

let bigGenerator = function* (){
	for(let i = 0; i < 10000; i++) {
		yield i;
	}
}

let squared = ( for (n of bigGenerator()) n * n );	
console.log(squared.next());