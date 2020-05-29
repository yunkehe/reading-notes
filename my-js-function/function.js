// ES6 数组去重方法
let arr = [{ accountId: 1 }, { accountId: 2 }, { accountId: 1 }, { accountId: 3 }];

let uniqueArr = arr.reduce((prev, obj) => {
  if (!prev.find(v => v.accountId == obj.accountId)) {
    prev.push(obj);
  }
  return prev;
}, []);
