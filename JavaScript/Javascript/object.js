// Objects
// one of the JS's data types.
// a collection of related data and/or functionality.
// Nearly all objects in JS are instances of Class.
// object = { key: value }; <-- key와 value의 집합체 

// 1. Literals and properties
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
    console.log(person.name);
    console.log(person.age);
}

const joo = { name: 'joo', age: 23 };
print(joo);

joo.hasJob = true; // object가 정의된 이후에 속성을 추가할 수 있음 
console.log(joo.hasJob);

delete joo.hasJob;
console.log(joo.hasJob);

// 2. Computed properties
// 동적으로 key의 value를 받아와야할 때 유용 
// key should be always string
console.log(joo.name);
console.log(joo['name']); // Computed property

console.clear();
function printValue(obj, key) {
    console.log(obj[key]);
}
printValue(joo, 'name');

// 3. Property value shorthand
const person1 = { name: 'bob', age: 7 };
const person2 = { name: 'alice', age: 12 };
const person3 = new Person('joo', 23); // value만 전달해주면 object를 만들어줌 
console.log(person3);

// 4. Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 5. in operator: property existence check (key in object)
// 해당 object에 해당 key가 있는지 없는지 확인 
console.log('name' in joo);
console.log('random' in joo); // false

// 6. for..in vs for..of
// for (key in object)
for(key in joo) {
    console.log(key);
}

// for (value of iterable)
const array = [1, 2, 3, 4];
for(value of array) {
    console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3...])
const user = { name: 'joo', age: 23 };
const user2 = user;
user2.name = 'coder';
console.log(user);

// old way
const user3 = {};
for(key in user) {
    user3[key] = user[key];
}
console.clear();
console.log(user3);

const user4 = Object.assign({}, user);
console.log(user4);

// another example
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
// 같은 속성값이 있을 경우 더 나중에 작성한 object 값으로 덮어씌워짐 
const mixed = Object.assign({}, fruit1, fruit2); 
console.log(mixed);