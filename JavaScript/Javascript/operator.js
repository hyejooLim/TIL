// 1. String concatenation
console.log('my ' + 'cat');
console.log('1' + 2); //숫자가 문자열로 변환 
console.log(`string literals: 1 + 2 = ${1 + 2}`);

// 2. Numeric operators
console.log(1 + 1); // add
console.log(1 - 1); // substract
console.log(2 * 2); // multiply
console.log(10 / 5); // divide
console.log(5 % 2); // remainder
console.log(2 ** 3); //exponentiation

// 3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
// counter = counter + 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postIncrement = counter++;
// preIncrement = counter;
// counter = counter + 1;
console.log(`postIncrement: ${preIncrement}, counter: ${counter}`);

// 4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y; // x = x - y;
x *= y; // x = x * y;
x /= y; // x = x / y;

// 5. Comparison operators
console.log(10 < 6); //less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal

// 6. Logical operators : || (or), && (and), ! (not)
const value1 = false;
const value2 = 4 < 2;

// || (or), finds the first truthy value
// true 값을 만나면 다음 조건을 검사하지 않고 바로 true 출력 
console.log(`or: ${value1 || value2 || check()}`);

// && (and), finds the first falsy value
// false 값을 만나면 다음 조건을 검사하지 않고 바로 false 출력 
console.log(`and: ${value1 && value2 && check()}`);

// often used to compress long if-statement
// nullableObject && nullableObject.something

function check() {
    for(let i=0; i<10; i++){
        console.log('🎁');
    }
    return true;
}

// ! (not)
console.log(!value1);

// 7. Equality
const stringFive = '5';
const numberFIve = 5;

// == loose equality, with type conversion
// 타입을 변경해서 검사 
console.log(stringFive == numberFIve);
console.log(stringFive != numberFIve);

// === strict equality, no type conversion
// 타입이 다르면 서로 다르다고 판단
console.log(stringFive === numberFIve);
console.log(stringFive !== numberFIve); 

// object equality by reference
const joo1 = { name: 'joo' };
const joo2 = { name: 'joo' };
const joo3 = joo1;
console.log(joo1 == joo2); // ref 값이 다르므로 false
console.log(joo1 === joo2); // ref 값이 다르므로 false
console.log(joo1 === joo3);

// 8. Conditional operators: if
// if, else if, else
const name = 'joo';
if(name === 'joo') {
    console.log('I am joo');
}
else if(name === 'ariel') {
    console.log('I am not joo');
}
else {
    console.log('unknown');
}

// 9. Ternary operator: ?
// condition ? value1 : value2;
console.log(name === 'joo' ? 'yes' : 'no');

// 10. Switch statement
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser) {
    case 'IE':
        console.log('I am IE');
        break;
    case 'Chrome':
        console.log('I am Chrome');
        break;
    case 'Firefox':
        console.log('I am Firefox');
        break;
    default:
        console.log('unknown');
        break;
}

// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
let i = 3;
while(i > 0) {
    console.log(`while: ${i}`);
    i--;
}

// do while loop, body code is executed first,
// then check the condition.
do {
    console.log(`do while: ${i}`);
    i--;
} while(i > 0);

// for loop, for(begin; condition; step)
for(i=3; i>0; i--) {
    console.log(`for: ${i}`);
}

// nested loops 
for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
        console.log(`{i: ${i}, j: ${j}}`);
    }
}