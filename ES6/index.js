// babel-core@5
var es5Code = 'let x = n => n+1';
var es6Code = require('babel-core')
    .transform(es5Code, {presets: ['es2015']})
    .code;  

console.log('es6Code: \n', es6Code);

