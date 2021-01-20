// Promise

// JS에서 제공하는 비동기를 간편하게 처리할 수 있게 도와주는 obj
// 정해진 장시간의 기능을 수행하고 나서 정상적으로 기능이 수행되면 성공의 메시지와 함께 처리된 결과값 전달
// || 기능을 수행하다가 예상치 못한 문제가 발생하면 에러를 전달
// state: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
// 기능이 성공적으로 수행되면 resolve 호출 
// 기능을 수행하다가 예상치 못한 문제가 발생하면 reject 호출 

const promise  = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  // 네트워크에서 데이터를 받아오거나 파일을 읽어오는 일은
  // 시간이 어느정도 걸리므로 비동기적으로 처리하는 것이 좋음
  console.log('doing something...');
  setTimeout(() => {
    resolve('joo');
    // reject(new Error('no network'));
  }, 2000);
});

// 2. Consumers: then, catch, finally
// then: returns result value or Promise
promise
  .then((value) => { // 성공했을 경우 
    console.log(value);
  })
  .catch((error) => { // 실패했을 경우 
    console.log(error);
  })
  .finally(() => { // 성공의 여부와 상관없이 항상 마지막에 실행 
    console.log('finally'); 
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000); 
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    })
  })
  .then(num => console.log(num));

// 4. Error Handling
const getHen = () => 
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐔'), 1000);
  });
const getEgg = (hen) => 
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`Error! ${hen} => 🥚`)), 1000);
  });
const cook = (egg) => 
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen()
  .then(hen => getEgg(hen))
  .catch(error => { // handle error
    return '🍕';
  })
  .then(egg => cook(egg))
  .then((food) => console.log(food));

// 5. 