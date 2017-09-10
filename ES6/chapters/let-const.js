var a = [];
for(let i=0; i<10; i++){
    a[i] = function () {
        console.log(i);
    }
}

a[6]();

// typeof x;
// let x; //let 不会变量提升

// 暂时性死区 temporal dead zone
// function bar(x=y, y=2){ //y还未声明
//     return [x, y];
// }
// bar();

// 不允许重复声明
function b(){
    let a = 10;
    // var a = 1;
}

// const 声明常量
const PI = 3.1415;

// PI = 3;
// const obj = {'name': 'heke'};
const obj = Object.freeze({'name': 'heke'});

obj.name = 'wang';
console.log(obj.name); 
