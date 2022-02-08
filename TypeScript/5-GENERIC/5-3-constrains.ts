interface Employee {
  pay: () => void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('full time!!');
  }

  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log('part time!!');
  }

  workPartTime() {}
}

// Bad function
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

// Good function
function pay<T extends Employee>(employee: T): T {
  employee.pay();
  return employee;
}

const sandy = new FullTimeEmployee();
const jin = new PartTimeEmployee();
sandy.workFullTime();
jin.workPartTime();

const sandyAfterPay = pay(sandy);
const jinAfterPay = pay(jin);
sandyAfterPay.workFullTime();
jinAfterPay.workPartTime();

const obj = {
  name: 'sandy',
  age: 24,
};

const obj2 = {
  animal: 'dog',
};

// key는 obj에 포함된 키 중 하나여야 함
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getValue(obj, 'name')); // sandy
console.log(getValue(obj, 'age')); // 24
console.log(getValue(obj2, 'animal')); // dog
