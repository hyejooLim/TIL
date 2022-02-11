// JavaScript에서 "this"는 호출하는 주체의 문맥에 따라 변경될 수 있으므로
// bind를 호출하거나 클래스 내부에서 this에 접근하는 함수를 arrow function으로 선언!

console.log(this); // Window

function simpleFunc() {
  console.log(this); // Window
}

simpleFunc(); // 글로벌 레벨에서의 호출
// window.simpleFunc();

class Counter {
  counter = 0;
  // increase = function () {
  //   console.log(this);
  // };
  increase = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase(); // Counter

// 변수는 글로벌 객체에 등록되지 않음 (const, let)
// this 정보를 잃어버리게 됨 -> 29 line: undefined 출력
const caller = counter.increase;
caller();

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run();
