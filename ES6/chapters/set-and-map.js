// Set Map 结构
let arr = [2, 4, 5, 2, 6],
    arr2 = ['red', 'green', 'blue'];

// 数组去重
function dedupe(arr) {
    return Array.from(new Set(arr));
}

console.log('dedupe: ', dedupe(arr));

let set2 = new Set(arr2);

for(let item of set2.entries()){
    console.log('set.entries foreach ', item);
}

let array = [...set2];
console.log('set2: ', array);

// 映射一个新的Set结构
let set3 = new Set([...set2].map(val => val + 2));
let set4 = new Set(Array.from(set2, val => val + 2));

console.log('set3 and set4', set3, set4);

// WeakSet 
// 内存泄漏

// Map结构 值-值
var m = new Map();
var o = {p: 'hello world'};

m.set(o, 'content');
console.log('m.get: ', m.get(o));

var m2 = new Map([['name', 'heke'], ['title', 'Author']]);
console.log('m2.size ', m2.size);
console.log('m2.get ', m2.get('name'));

// Map的键是跟内存地址绑定的

for(let [key, value] of m2.entries()){
    console.log('map.entries: ', key, value);
}