// ES6模板字符串

const template2 = data => `
  <p>name: ${data.name}</p>
  <p>age: ${data.profile.age}</p>
  <ul>
    ${data.skills.map(skill => `
      <li>${skill}</li>
    `).join('')}
  </ul>`

const data = {
  name: 'zhaomenghuan',
  profile: { age: 24 },
  skills: ['html5', 'javascript', 'android']
}

// document.body.innerHTML = template2(data);

var template = function(tpl, data) {
  var re = /{{(.+?)}}/g,
    cursor = 0,
    reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,    
    code = 'var r=[];\n';

  // 解析html
  function parsehtml(line) {
    // 单双引号转义，换行符替换为空格,去掉前后的空格
    line = line.replace(/('|")/g, '\\$1').replace(/\n/g, ' ').replace(/(^\s+)|(\s+$)/g,"");
    code +='r.push("' + line + '");\n';
  }
  
  // 解析js代码        
  function parsejs(line) {   
    // 去掉前后的空格
    line = line.replace(/(^\s+)|(\s+$)/g,"");
    code += line.match(reExp)? line + '\n' : 'r.push(' + 'this.' + line + ');\n';
  }    
    
  // 编译模板
  while((match = re.exec(tpl))!== null) {
    // 开始标签  {{ 前的内容和结束标签 }} 后的内容
    parsehtml(tpl.slice(cursor, match.index));
    // 开始标签  {{ 和 结束标签 }} 之间的内容
    parsejs(match[1]);
    // 每一次匹配完成移动指针
    cursor = match.index + match[0].length;
  }
  // 最后一次匹配完的内容
  parsehtml(tpl.substr(cursor, tpl.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

// 简单的模板引擎原理
var tpl = '<ul>\
    {{ for(var i=0; i<5; i++){  }}\
    <li>{{ name }}</li>\
    {{ } }}\
</ul>';


// d
// ocument.body.innerHTML = template(tpl, {name: '何珂'});
