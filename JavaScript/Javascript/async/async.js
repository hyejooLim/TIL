// async & await
// 간편하게 promise를 사용할 수 있는 방법

// 1. async
// 코드 블록이 promise로 바뀌게 됨
async function fetchUser() {
  // do network request in 10 secs...

  // return new Promise((resolve, reject) => resolve('joo'));
  return 'joo';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await ✨
// async 안에서만 사용 가능 (동기적으로 처리되도록 함)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}

async function getBanana() {
  await delay(2000);
  return '🍌';
}

// function pickFruits() {
//   return getApple()
//   .then(apple => {
//     return getBanana()
//       .then(banana => `${apple} + ${banana}`);
//   })
// }

async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful Promise APIs
// 모든 Promise들을 병렬적으로 수행
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
  .then(fruits => fruits.join(' + '));
}

pickAllFruits().then(console.log);

// 어느 것이든 상관없이 가장 먼저 수행되는 Promise 반환
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);

// Callback to Promise
class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(
          (id === 'joo' && password === 'mint') ||
          (id === 'nimo' && password === 'fish')
        ) {
          resolve(id); // resolve 콜백함수에 id 전달
        } else {
            reject(new Error('not found'));
        }
      }, 2000);
    })
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(user === 'joo') {
          resolve({ name: 'joo', role: 'admin' });
        } else {
          reject(new Error('no access'));
        }
      }, 1000)
    })
  }

  async accessControl() {
    const login = await userStorage.loginUser(id, password);
    const user = await userStorage.getRoles(login);
    return `Hello ${user.name}, you have a ${user.role} role again!`;
  }
}

const userStorage = new UserStorage();
const id = prompt('Enter your id');
const password = prompt('Enter your password');

userStorage.accessControl()
  .then(message => alert(message))
  .catch(message => alert(message));
