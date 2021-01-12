// Function
// - fundamental building block in the program
// - subprogram can be used multiple times
// - perform a task or calculates a value

// 1. Function declaration
// function name(param1, param2) { body... return; }
// one function === one thing
// naming : dosomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint
// function is object in JS 
function printHello(){
    console.log('Hello');
}
printHello();

function log(message){
    console.log(message);
}
log(123); // 숫자를 문자열로 변환하여 출력 

// 2. Parameter
// primitive parameters: passed by value
// object parameters: passed by reference
function changeName(obj){
    obj.name = 'coder';
}
const joo = { name: 'joo '};
changeName(joo);
console.log(joo);

// 3. Default parameters (added in ES6)
// 기본값인 'undefined' 대신에 따로 지정해준 'unknown'이 출력 
function showMessage(message, from = 'unknown'){
    console.log(`${message} by ${from}`);
}
showMessage('Hi');

// 4. Rest parameters (added in ES6)
// 정해지지 않은 수를 배열로 나타낼 수 있게 해줌 
function printAll(...args){
    for(let i=0; i<args.length; i++){
        console.log(args[i]);
    }
    for(const num of args){
        console.log(num);
    }
    args.forEach((num) => console.log(num));
}
printAll('one', 'two', 'three', 'four');

// 5. Local scope
let globalValue = 'global'; // global variable
function printValue() {
    let value = 'local'; // local variable
    console.log(value);
    console.log(globalValue);
    
    function printValue2() {
        console.log(value);
        let value2 = 'local2';
    }
    // console.log(value2); // ReferenceError
}
printValue();

// 6. Return a value
function sum(a, b) {
    return a + b;
}
const result = sum(1, 3);
console.log(result);

// 7. Early return, early exit
// bad
function upgradeUser(user) {
    if(user.point > 10){
        // long upgrade logic...
    }
}
// good 
// 조건이 맞지 않을 때는 빠르게 리턴하고 필요할 때만 수행 
function upgradeUser(user) {
    if(user.point <= 10) {
       return;
    }
    // long upgrade logic...
}

// First-class function
// function are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other functions
// can be returned by another function

// 1. Function expression
// a function declaration can be called earlier than it is definded. (hoisted)
// -> 함수가 정의되기 전에도 호출할 수 있음 (선언을 가장 위로 올려주기 때문에 가능)
// a function expression is created when the execution reaches it.
// -> 함수가 변수에 할당된 이후부터 호출할 수 있음 
const print = function() { // anonymous function
    console.log('print');
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. Callback function using function expression
// Callback 함수는 다른 함수의 매개변수로 함수를 전달하고, 
// 어떠한 이벤트가 발생한 후 매개변수로 전달된 함수가 다시 호출되는 것을 말함 
function randomQuiz(answer, printYes, printNo) {
    if(answer === 'love you') {
        printYes();
    }
    else {
        printNo();
    }
}
// anonymous function
const printYes = function () {
    console.log('Yes!');
}
// named function
// 함수 이름은 자신의 함수 내에서만 참조 가능 
// 디버깅할 때 디버깅의 stack trace에 함수이름이 나오게 하기 위해 씀 
// recursions: 함수 내에서 자신을 호출 
const printNo = function print() {
    console.log('No!');
    // print();
};
randomQuiz('love you', printYes, printNo);
randomQuiz('wrong', printYes, printNo);

// Arrow function 
// always anonymous

// const simplePrint = function() {
//   console.log('simplePrint!');
// }

const simplePrint = () => console.log('simplePrint!');
const add = (a, b) => a + b;

// 함수 내에서 다양한 작업을 해야한다면 블록 사용 
const multiply = (a, b) => {
    // do something more
    return a * b;
};

// IIFE: Immediately Invoked Function Expression
// 함수가 선언되는 동시에 호출됨
(function hello() {
    console.log('hello!');
})(); 

// ----- Quiz -----
function operate(command, a, b) {
    if(command === 'add') {
        addNum(2, 2);
    }
    else if(command === 'substract') {
        substractNum(2, 1);
    }
}

const addNum = (a, b) => console.log(a + b);
const substractNum = (a, b) => console.log(a - b);

operate('add', addNum, substractNum);
operate('substract', addNum, substractNum);
