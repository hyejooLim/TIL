'use strict';

// Javascript is synchronous
// Execute the code block by order after hoisting
// hoisting: var, function declaration
// synchronous: 정해진 순서에 맞게 수행 
// asynchronous: 작업을 요청해두고 다른 작업 수행(언제 코드가 실행될지 예측 불가)
// callback function: 전달해준 함수를 다시 불러줘! 

console.log('1');
setTimeout(() => console.log('2'), 1000); // 지정한 시간이 지나면 콜백함수 호출 (브라우저에서 제공하는 API) 
console.log('3');

// Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello!'));

// Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

// Callback Hell example
// 백엔드와 데이터 주고 받기(^^..)
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if(
        (id === 'joo' && password === 'mint') ||
        (id === 'nimo' && password === 'fish')
      ) {
        onSuccess(id); // onSuccess 콜백함수에 id 전달 
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSucces, onError) {
    setTimeout(() => {
      if(user === 'joo') {
        onSucces({ name: 'joo', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000)
  }
}

const userStorage = new UserStorage();
const id = prompt('Enter your id');
const password = prompt('Enter your password');

userStorage.loginUser(
  id, 
  password, 
  (user) => {
    userStorage.getRoles(
      user, 
      (userWithRole) => {
       alert(`Hello! ${userWithRole.name}, you have a ${userWithRole.role} role.`); 
      }, 
      (error) => alert(`${error}`));
  }, 
  (error) => alert(`${error}`));