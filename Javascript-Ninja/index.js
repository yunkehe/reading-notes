// 断言测试
function assert(condition, message) {
	if(condition){
		console.info(message);
		return true;
	}else{
		console.error('assert false')
		return false;
	}
}

// 收集性能信息
star = new Date().getTime();
for(var n = 0; n < maxCount; n++) {

}
elapsed = new Date().getTime();
assert(true, 'Measured time: ' + elapsed);

// 一个精简的用于jQuery的DOM测试用例
// jsbin.com

// 测试框架
// 简单的异步测试套件