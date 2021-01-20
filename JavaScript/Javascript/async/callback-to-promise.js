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
}

const userStorage = new UserStorage();
const id = prompt('Enter your id');
const password = prompt('Enter your password');

userStorage.loginUser(id, password)
  .then(id => userStorage.getRoles(id))
  .then(user => alert(`Hello ${user.name}! You have a ${user.role} role!`))
  .catch(error => alert(error));