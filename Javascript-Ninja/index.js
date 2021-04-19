// 断言测试
function assert(condition, message) {
	if(condition){
		console.info(message);
		return true;
	}else{
		console.error(message)
		return false;
	}
}

function test() {
	let maxCount = 200;
	// 收集性能信息
	let star = new Date().getTime();
	for(var n = 0; n < maxCount; n++) {

	}
	let elapsed = new Date().getTime();
	assert(true, 'Measured time: ' + elapsed);
}

test();
// 一个精简的用于jQuery的DOM测试用例
// jsbin.com

// 测试框架
// 简单的异步测试套件
