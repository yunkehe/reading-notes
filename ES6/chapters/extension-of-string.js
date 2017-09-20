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
var name = "Bob", time = "today";
var s3 = `Hello ${name}, how are you ${time}?`;
console.log(s3);

// 模板编译
var template = `
    <ul>
        <% for(var i=0; i<data.supplies.length; i++){ %>
        <li><%= data.supplies[i] %></li>
        <% } %>
    </ul>
`;

// 思路
// echo('<ul>');
// for(var i=0; i < data.supplies.length; i++) {
//   echo('<li>');
//   echo(data.supplies[i]);
//   echo('</li>');
// };
// echo('</ul>');

// var evalExpre = /<%=(.+?)%>/g;
// var expr = /<%([\s\S]+?)%>/g;

// var template = template
//     .replace(evalExpre, '`); \n echo($1); echo(`')
//     .replace(expr, '`); \n $1 \n echo(`');

// template = 'echo(`'+template+'`);';

// var script = `(function parse(data){
//         var output = ""; 

//         function echo(html){
//             output += html;
//         };

//         ${template};

//         return output;
//     })`;

// return script;


function compile(template){
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
  `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}


var parse = eval(compile(template));

// console.log('parse: ', parse);
console.log('parse result:', parse({ supplies: [ "broom", "mop", "cleaner" ] }));