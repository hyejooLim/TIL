'use strict';

// Array

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['🍉', '🍇'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[fruits.length - 1]);

console.clear();
// 3. Looping over an arrary
// print all fruits
// a. for
for(let i=0; i<fruits.length; i++) {
    console.log(fruits[i]);
}

// b. for...of
for(let fruit of fruits) {
    console.log(fruit);
}

// c. forEach
fruits.forEach((fruit) => console.log(fruit));

// 4. Addition, deletion, copy
// push: add an item to the end
fruits.push('🍋', '🥝');
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the beginning
fruits.unshift('🍋', '🥝');
console.log(fruits);

// shift: remove an item from the beginning
fruits.shift();
fruits.shift();
console.log(fruits);

console.clear();
// note! unshift, shift are slower than push, pop
// splice: remove an item by index position
fruits.push('🍋', '🥝');
console.log(fruits);
fruits.splice(1); // 1번째 인덱스부터 모두 삭제 
console.log(fruits);

fruits.push('🍇', '🍋', '🥝');
fruits.splice(1, 1, '🍌'); // 1번째 인덱스부터 1개 삭제하고 그 자리에 바나나 삽입 
console.log(fruits);

// combine two arrays
const fruit2 = ['🍒', '🍐'];
const newFruits = fruits.concat(fruit2);
console.log(newFruits);

// 5. Searching
// indexof: find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('🍋'));
console.log(fruits.indexOf('🥝'));

// includes
console.log(fruits.includes('🍒'));
console.log(fruits.includes('🍉'));

// lastIndexof
fruits.push('🍉');
console.log(fruits);
console.log(fruits.indexOf('🍉'));
console.log(fruits.lastIndexOf('🍉')); // 수박의 가장 마지막 인덱스 

// toString vs toLocaleString
console.clear();
const arr = [1, 2, 3, 4, 5];
console.log(arr.toString());
console.log(arr.toLocaleString());

// reverse
arr.reverse();
console.log(arr);
console.log(arr.slice(1, 4));

// sort
console.clear();
console.log(arr);
arr.sort((a, b) => a - b); // 오름차순 정렬 
console.log(arr);
arr.sort((a, b) => b - a); // 내림차순 정렬 
console.log(arr);

// every vs some
function isBigEnough(value) {
    return value < 4;
}

console.log(arr.every(isBigEnough)); // 배열의 모든 원소가 4보다 작으면 true 
console.log(arr.some(isBigEnough)); // 배열의 어떠한 원소라도 4보다 작으면 true

// map 
// 배열의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환 
arr.reverse();
const map1 = arr.map(x => x*2); 
console.log(map1);

// filter
// 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열을 반환 
const words = ['kitty', 'flower', 'pizza', 'watermelon', 'iphone'];
const newWords = words.filter(word => word.length > 5);
console.log(newWords);

// reduce
// 배열의 각 요소에 대해 주어진 reducer 함수를 실행하고 그 결과값을 반환 
const reducer = (accmulator, currentValue) => accmulator + currentValue;
console.log(arr.reduce(reducer)); // 15
console.log(arr.reduce(reducer, 5)); // 20