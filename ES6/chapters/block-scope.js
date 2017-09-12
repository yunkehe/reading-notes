// 块级作用域
// 函数本身的作用域在其所在的块级作用域之内
// 严格模式下，函数只能在顶层作用域和函数内声明
let f;
{
    let a = 'secret';
    f = function () {
        return a;
    }
}

// f();
console.log(f());
