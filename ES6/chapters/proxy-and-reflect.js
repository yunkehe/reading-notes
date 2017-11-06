// 元编程
var obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log('getting ${key}!');
        return Reflect.get(target, key, receiver);
    }
})
obj.count = 1;
++obj.count;
// console.log('get: ', obj.count);

// 一个技巧是将 proxy对象设置到object.proxy属性上
// 可以拦截的操作
// 1. get
// 2. set 
// 3. has
// 4. deleteProperty
// 5. enumerate
// 6. hasOwn
// 7. ownKeys
// 详见文档

// Reflect对象
// （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

// （2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
// （3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
// （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。