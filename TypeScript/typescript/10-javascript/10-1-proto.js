// JavaScript의 모든 객체는 Object를 상속함

// x와 y는 동일한 Object의 __proto__를 상속함
const x = {};
const y = {};
console.log(x);
console.log(y);

// array는 Array의 __proto__를 상속하고 Array 프로토타입은 Object 프로토타입을 상속함
const array = [];
console.log(array);

console.clear();

function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level
  // this.makeCoffee = (shots) => {
  //   console.log('making...☕️');
  // };
}

// Prototype member level
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making...☕️');
};

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMaching(milk) {
  this.milk = milk;
}

// LatteMachine은 CoffeeMachine을 상속하게 됨
LatteMaching.prototype = Object.create(CoffeeMachine.prototype);

const latteMachine = new LatteMaching(30);
console.log(latteMachine);
latteMachine.makeCoffee();
