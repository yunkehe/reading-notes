class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    if (this.subs.length > 0) {
      let index = this.subs.indexOf(sub)
      if (index > -1) {
        this.subs = this.subs.splice(index, 1)
      }
    }
  }

  depend() {
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



class Watcher {
  constructor(vm, expOrFun, cb) {
    this.vm = vm
    // 获取data.a.b.c 最后一层对象
    this.getter = parsePath(expOrFun)
    this.cb = cb
    this.value = this.get()
  }

  get() {
    // 先把自己设置到全局指定的位置
    window.target = this
    // 然后读取数据 因为读取了数据 所以会触发这个数据的getter
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

class Observer {
  constructor(value) {
    this.value = value

    if (!Array.isArray(value)) {
      this.walk(value)
    }
  }

  walk(obj) {
    let keys = Object.keys(obj)
    keys.forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, val) {
  if (typeof obj === 'object') {
    new Observer(obj)
  }

  let dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()
      return val
    },
    set(newValue) {
      if (newValue === val) {
        return newValue
      }
      val = newValue
      dep.notify()
    },
  })
}
