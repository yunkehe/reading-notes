export default function foo() {
	console.log('I\' m module foo. \nimport foo from ... 等价于 import {default as foo} from ... ');
}

export function bar() {
	console.log('I\' m module bar');
}

export function baz() {
	console.log('I\' m module baz');
}
