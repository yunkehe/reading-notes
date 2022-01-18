// var bailRE = new RegExp('[^' + unicodeRegExp.source + '.$_\\d]')
// 读取 a. 会报错
let bailRE = /[^\w.$]/

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.')
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    def(target, key, src[key])
  }
}

const hasProto = '__proto__' in {}

function observe(value, asRootData) {
  if (!isObject(value)) {
    return
  }

  let obj
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    obj = value.__ob__
  } else {
    obj = new Observer(value)
  }

  return obj
}

// object.defineProperty()
/**
 * 管理依赖，侦测对象变化的依赖，每一个被侦测的值会有多个依赖
 */
class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  // 删除依赖
  removeSub(sub) {
    if (this.subs.length > 0) {
      let index = this.subs.indexOf(sub)
      if (index > -1) {
        this.subs = this.subs.splice(index, 1)
      }
    }
  }

  depend() {
    // 依赖是谁？
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    // 浅拷贝一个新数组
    const subs = this.subs.slice()
    subs.forEach(v => {
      v.update()
    })
  }
}

// vm.$watch('a.b.c', function (newValue, value) {
// 	console.log('一个依赖')
// })
// 实现一个Watcher类， 来处理该依赖
// 这段代码可以把自己主动添加到data.a.b.c的Dep中去，
// 假设只添加data.a
// vm.prototype.$watch = function(vm)
// 简单版的watcher
let vm = {}
vm.__proto__.$watch = function (expOrFn, cb, options) {
  var vm = this
  return new Watcher(vm, expOrFn, cb)
}

class Watcher {
  constructor(vm, expOrFun, cb) {
    this.vm = vm
    // 获取data.a.b.c 最后一层对象
    // 返回一个 读取到 最后一层值的方法 方法
    this.getter = parsePath(expOrFun)
    this.cb = cb
    this.value = this.get()
  }

  get() {
    // 先把自己设置到全局指定的位置
    window.target = this
    // window.target 只是一个中间桥梁 真正读取值的是 当前的watcher示例
    // 因为读取了getter 所以Dep中就会push一个依赖，就是当前的watcher示例
    // 因为读取了数据 所以会触发这个数据的getter
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, this.oldValue)
  }
}

let arrayMethods = (() => {
  // 实现一个拦截器
  const arrayProto = Array.prototype
  const arrayMethods = Object.create(arrayProto)
  // 记忆改变数组长度的方法
  let methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
  methods.forEach(method => {
    protoMethod = arrayProto[method]

    def(arrayMethods, method, function mutatur(...args) {
      const result = protoMethod.app(this, args)
      console.log('数组拦截器中的方法')
      // 获取ob实例
      const ob = this.__ob__
      let inserted
      switch (key) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          // splice 替换进入数组的新元素
          inserted = args.slice(2)
          break
      }
      // 向依赖发送消息
      ob.dep.notify()
      return result
    })
  })
  return arrayMethods
})()

class Observer {
  constructor(value) {
    this.value = value
    // array的依赖存放再observer中
    this.dep = new Dep()
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      this.observeArray(value)
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        // 处理不能使用 __proto__ 的情况。
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // value.__proto__ = arrayMethods
    } else {
      this.walk(value)
    }
  }

  // 将一个数据内的所有属性（包括子属性）都转换成getter/setter的形式，然后去追踪它们的变化
  walk(obj) {
    let keys = Object.keys(obj)
    keys.forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}

/**
 * 对Object,.defineProperty进行封装
 * @param {Object} obj 需要侦测的对象
 * @param {String|Number} key 需要侦测的对象的属性
 * @param {*} val
 */
// 收集谁，换句话说，就是当属性发生变化后，通知谁。
// 属性变化时，通知谁？ 在使用这个属性的地方搜集他们，更改属性的值时，通知他们。
function defineReactive(obj, key, val) {
  if (typeof obj === 'object') {
    new Observer(obj)
  }

  let childOb = observe(val)
  let dep = new Dep()
  // let deps = []

  // 在getters中收集依赖、setters中触发依赖
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 假设window.target是一个依赖
      // deps.push(window.target)
      // deps.push(window.target2)
      // deps.push(window.target3)
      dep.depend()

      if (childOb) {
        childOb.dep.depend()
      }
      return val
    },
    set(newValue) {
      if (newValue === val) {
        return newValue
      }
      val = newValue
      // deps.forEach(dep => {
      // 	dep(newValue, val)
      // })
      dep.notify()
    },
  })
}
