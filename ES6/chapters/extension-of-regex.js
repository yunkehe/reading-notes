// 正则的扩展
// u修饰符 被解读为unicode表达式
/^\uD83D/u.test('\uD83D\uDC2A');
// 点字符中必须加u
// 预定义模式的识别
var s = '\u{20bb7}';
console.log('预定义模式： ', /^\S$/u.test(s));

 // 正确返回字符串长度的方法
function codePointLength(text) {
     var result = text.match(/[\s\S]/gu);
     return result ? result.length : 0;
} 

var s2 = "𠮷𠮷";

console.log('"𠮷𠮷"的长度是: ', s2.length);
console.log('"𠮷𠮷"的长度是: ', codePointLength(s2));

// y修饰符
// 让头部匹配的标志^在全局匹配中都有效
'#x#'.split(/#/y); 
// 只有紧跟前面的分隔符才会被识别

const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y; 
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g; 

function tokenize(TOKEN_REGEX, str){
    let result = [];
    let match;
    while(match = TOKEN_REGEX.exec(str)){
        result.push(match[1]);
    }
    return result;
}

console.log('TOKEN_Y', tokenize(TOKEN_Y, '3x + 4'));
// g会忽略非法字符
console.log('TOKEN_G', tokenize(TOKEN_G, '3x + 4'));

// 字符串转义
function escapeRegExp(str){
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // $& 与regexp相匹配的子串
}

console.log('字符串转义', escapeRegExp('Buy it. use it. break it. fix it'));