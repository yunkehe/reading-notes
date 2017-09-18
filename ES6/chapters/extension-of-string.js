// js中共有多少种方法表示一个字符
'\z' === 'z';

var s = '\u{20bb7}a';
for(let ch of s){
    console.log(ch.codePointAt(0).toString(16));
}

// 判断一个字符是否是4个字节
function is32Bit(c){
    return c.codePointAt(0) > 0xFFFF;
}

// Unicode 正规化
'\u01d1'.normalize() === '\u004f\u030c'.normalize();

var s2 = 'Hello World!';
s2.startsWith('Hello'); 
s2.endsWith('!');
s.includes('o');

// repeat
// padStart
// padEnd

//  模板字符串
// 模板编译
