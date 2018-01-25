// 类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x ', ' + this.y +')'
    }
}

// 类的所有方法都定义在prototype属性上
