// JSON
// JavaScript Object Notation
// 서버와 데이터를 주고받기 위한 포맷 
// 프로그래밍 언어와 플랫폼에 상관없이 사용 가능 

// 1. Object to JSON
// stringify(object)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => { // 함수는 JSON에 포함되지 않음 
        console.log(`${this.name} can jump!`);
    },  
}

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json);

// callback 함수를 이용하여 원하는 조건을 만들 수 있음
json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'joo' : value;
});

console.log(json);

// 2. JSON to Object
// parse(json)
console.clear();
json = JSON.stringify(rabbit);
let obj = JSON.parse(json);
console.log(obj);
rabbit.jump();
// obj.jump(); // Error: 변환한 object에는 jump()가 없음 

console.log(`date: ${rabbit.birthDate}, type: ${typeof rabbit.birthDate}`); // object
console.log(`date: ${obj.birthDate}, type: ${typeof obj.birthDate}`); // string
console.log(rabbit.birthDate.getDate());
// console.log(obj.birthDate.getDate()); // Error
// 주의! JSON으로 변환되고 다시 object로 변환된 것은 모두 string 타입

// callback 함수를 이용하여 원하는 조건을 만들 수 있음
obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj);
console.log(obj.birthDate.getDate()); // now okay