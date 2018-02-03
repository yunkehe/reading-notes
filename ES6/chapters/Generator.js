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