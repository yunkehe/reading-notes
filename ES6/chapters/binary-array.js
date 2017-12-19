// ArrayBuffer
// TypedArray
// DataView
var buf = new ArrayBuffer(32); // 32 Byte
var dataView = new DataView(buf);
var x1 = new Int32Array(buf);
var x2 = new Uint8Array(buf);

console.log('getUnit8: ', dataView)
// console.log('getUnit8: ', dataView.getUnit8(0))
x2[0] = 2;
console.log('Int32Array: ', x1)
console.log('isView: ', ArrayBuffer.isView(buf))
console.log('isView: ', ArrayBuffer.isView(x1))

var v3 = new Uint8Array(buf, 2, 2);

// 合并TypedArray数组 concate

var buffer = new ArrayBuffer(4);
var v1 = new Uint8Array(buffer);
var uInt16View = new Uint16Array(buffer);
v1[0] = 2;
v1[1] = 1;
v1[2] = 3;
v1[3] = 7;

// 转换成 16位 
//  1 2, 7 3
//  Math.pow(2, 8) + 2  结果 258
//  Math.pow(2, 10) + Math.pow(2, 9) + Math.pow(2, 8) + 3 结果 1795
console.log('v1: ', v1)
console.log('uInt16View: ', uInt16View)
