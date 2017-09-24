// 函数的默认值
function foo({x, y=1}) {
    console.log('x, y: ', x, y);
}

foo({x: 5, y: 6});

function m1({x = 0, y = 0} = {}){
    return [x, y];
}

function m2({x, y} = {x: 0, y: 0}){
    return [x, y];
}

console.log( m1({x: 3}) );
console.log( m2({x: 3}) );

// length属性返回没有指定默认值的参数个数
console.log('length: ',  (function(a){}).length );
console.log('length: ', (function(a=1){}).length );
console.log('length: ', (function(a, b, c=1){}).length );