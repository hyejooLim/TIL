// 1. Use strict
// added in ES 5 
// use this for Valina Javascript
'use strict';

// 2. Variable, rw(read, write)
// let <-- added in ES 6
// mutable data type

// var (don't ever use this!)
// var hoisting : 어느 곳에 선언하든지 항상 선언을 가장 위로 끌어올려줌   
// has no block scope

// 3. Constant, r(read only)
// const <-- 한 번 할당하면 값이 변하지 않음 
// use const whenever possible.
// only use let if variable needs to change.
const dayInWeek = 7; 
console.log(dayInWeek);

// Note!
// Immutable data types: primitive types, frozen objects (i.e. object.freeze())
// Mutable data types: all objects by default are mutable in JS
// favor immutable data type always for a few reasons:
// security / thread safety / reduce human mistakes

// 4. Variable types
// primitive, single item: number, string, boolean, null, undefined, symbol
// object, box container: single items을 묶어서 한 박스로 관리할 수 있게 해줌 
// function, first-class function
// --> function도 변수에 할당이 가능하고, 함수의 리턴 타입으로 가능
const a = 15;
console.log(`value: ${a}, type: ${typeof a}`);

// number > special numeric values: infinity, -infinity, NaN
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

// string
const char = 'c';
const apple = 'apple';
const fruit = 'red ' + apple;
console.log(`value: ${char}, type: ${typeof char}`);
console.log(`value: ${fruit}, type: ${typeof fruit}`);
const helloApple = `hello ${apple}`; //template literals (string)
console.log(`value: ${helloApple}, type: ${typeof helloApple}`);

// boolean 
// false: 0, null, undefined, NaN, ''
// true: any other value
const canRead = true;
const test = 3 < 1;
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null
// 명확하게 넌 비어있는 empty 값이야! 라고 지정해줘야 함  
let nothing = null;
console.log(`value: ${nothing} type: ${typeof nothing}`);

// undefined
let x;
console.log(`value: ${x} type: ${typeof x}`);

// Symbol <-- create unique identifiers for objects 
// 고유한 식별자가 필요하거나 concurrency한 코드에서 우선 순위를 두고 싶을 때
// 지정된 스트링에 상관없이 고유한 식별자를 만들 수 있음 
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2);

// 스트링이 동일할 경우, 동일한 symbol을 만들고 싶을 때 
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2);
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

// object, real-life object, data types
const joo = { name: 'joo', age: 22 };
joo.age = 23;
console.log(`value: ${joo.name}, type: ${typeof joo}`);

// 5. Dynamic typing: dynamically typed language
let text = 'hello';
console.log(text.charAt(0));
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = '10' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
//console.log(text.charAt(0)); //Error 