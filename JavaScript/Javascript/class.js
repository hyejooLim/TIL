'use strict'
// Object-oriented programming
// class: template
// object: instance of a class 
// Javascript classes
// - introduced in ES6
// - syntactical sugar over prototype-based inheritance

// Prototype 
// JS는 프로토타입 기반 언어 
// 객체는 언제나 함수(function)로 생성됨
function Person1() {}
Person1.prototype.eyes = 'circle';
Person1.prototype.nose = 'high';
const joo = new Person1(); // 함수로 객체를 생성 

// JS에서 기본적으로 제공하는 함수인 Object()는 최상위 함수 
// 두 코드는 같은 의미 
// const obj = {};
const obj = new Object();

// 함수가 정의될 때 2가지 일이 동시에 이루어짐
// 1. 해당 함수에 생성자(Constructor) 자격 부여
// --> 생성자 자격이 부여되면 'new'를 통해 객체를 만들 수 있게 됨 
const val = {};
// const a = new val(); // Error: Val is not a constructor

// 2. 해당 함수의 Prototype Object 생성 및 연결 
// --> 함수를 정의하면 Prototype Object도 같이 생성됨 
console.log(Person1.prototype); 

// 생성된 함수는 prototype이라는 속성을 가지고, Prototype Object에 접근할 수 있음(가리킴)
// Prototype Object는 일반적인 객체와 같으며 기본 속성으로 constructor와 __proto__를 가지고 있음
// constructor: 생성된 함수를 가리킴 
// __proto__: Prototype link 역할(자신의 상위 함수의 Prototype Object를 가리킴) 
// 함수를 통해 생성된 객체는 __proto__ 속성만을 가지고 있음 
// joo 객체는 eyes 속성을 직접 가지고 있지 않기 때문에 eyes 속성을 찾을 때까지 상위 프로토타입을 탐색
// 최상위인 Object의 Prototype Object까지 도달했음에도 불구하고 찾지 못했을 경우에는 undefined 리턴 
// Prototype chain: __proto__ 속성을 통해 상위 프로토타입과 연결되어 있는 형태  
console.log(joo.eyes); // circle 

// 1. Class declaration
class Person {
    // constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // method
    speak() {
        console.log(`${this.name} says hello!`);
    }
}

const Joo = new Person('joo', 23);
console.log(Joo.name);
console.log(Joo.age);
Joo.speak();

// 2. Getter and Setters
// getter/setter의 이름을 다르게 설정해야 call stack 방지할 수 있음  
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;  
    }

    // 값을 리턴함 
    get age() {
        return this._age;
    }

    // 값을 설정해야 하기 때문에 값을 받아야 함  
    set age(value) {
        // if(value < 0) {
        //     throw Error('age can not be negative');
        // }
        this._age = value < 0 ? 0 : value;
    }
}

const user1 = new User('Steve', 'Job', -1);
console.log(user1.age);

// 3. Fields (public, private)
// Too soon!
class Experiment {
    publicField = 2; // 외부에서 접근 가능 
    #privateField = 1; // 클래스 내부에서만 접근 가능(외부에서는 r/w 불가)
}

const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4. Static properties and methods
// Too soon!
// 'static'은 클래스 자체에 붙어있음 
class Article {
    static publisher = 'cute dog';
    publisher1 = 'cute cat';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
console.log(article1.publisher1);
console.log(article1.publisher); //undefined
console.log(Article.publisher);
console.log(article1.articleNumber);
// article1.printPublisher(); // Error
Article.printPublisher();

// 5. 
class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        console.log(`with drawing ${this.color} color`);
    }

    getArea() {
        return this.width * this.height; 
    }
}

// 5. Inheritance
// a way for one class to extend another class
class Rectangle extends Shape {}
class Triangle extends Shape {
    draw() {
        super.draw(); // 부모의 메소드도 호출 
        console.log('🔺'); // overriding: 상속받은 부모의 메소드 재정의
    }
    getArea() {
        return (this.width * this.height) / 2; // 다형성: 부모의 메소드 구현 
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
const triangle = new Triangle(20, 20, 'red');
rectangle.draw();
console.log(rectangle.getArea());
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceof
console.log(rectangle instanceof Rectangle);
console.log(rectangle instanceof Shape);
console.log(triangle instanceof Rectangle); // false 
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object); // true
// JS에서 만든 모든 class들은 Object를 상속한 것임 