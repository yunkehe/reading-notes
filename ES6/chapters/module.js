// Module

// 运行时加载
// let {stat, exists, readFile} = require('fs');

// 编译时加载
// import {stat, exists, readFile} from 'fs';

// export
// export var name = 'Heke';
// export var year = '1990';

function v1() {};
function v2() {};

// 可以使用as重命名
export {
    v1 as stream1,
    v2 as stream
}

// 使用 *
// import {area, circumference} from './circle';
// import * as circle from './circle';

// module
// module circle from './circle';

// import自定义名称与export default配合使用
// import 不需要使用大括号
// import customName from './export-default.js';

// CommanJS输入的是被输入的值的拷贝
// ES6模块加载的是值的引用
// ES6 循环加载