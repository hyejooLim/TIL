// 1. Single threaded language
// JS is single threaded language (call stack is one)
// -> Event Loop는 call stack에서 수행 중인 함수가 끝날 때까지 다른 일을 할 수 없음 
// JS에서도 Web APIs(브라우제에서 제공하는 APIs)를 이용하여 멀티쓰레딩 가능 (한 번에 여러가지 일 수행)

// 2. Browser Rendering
// 브라우저는 좋은 사용자 경험을 위해 초당 60번 화면을 레더링 함 (16ms에 1번)
// Event Loop가 루프를 도는 동안에 브라우저 화면은 주기적으로 업데이트됨 (루프 몇 바퀴에 한 번씩 ..)

// 3. Interaction between Browser and JavaScript Engine 
// Example
// main() -> first() -> second() -> setTimeout() (second에서 호출한 함수)
// call stack에 순서대로 쌓이게 됨 (setTimeout() at the top)
// setTimeout이 호출되면 setTimeout은 call stack에서 제거되고
// timeout 시간 동안 브라우저에서 타이머 동작 (이 때 자바스크립트 엔진에서는 병렬적으로 일 수행)
// 타이머 동작이 끝나면 callback 함수를 Task queue에 push

// 4. Event Loop
// Task queue와 call stack을 관찰하는 것이 바로 Event Loop!
// Event Loop는 call stack이 비어 있으면 Task queue에 있는 callback 함수를 call stack에 가져와서
// 해당 함수를 자바스크립트 엔진이 수행할 수 있도록 함 (한 번에 하나만 가져옴) 

// 5. Microtask queue & Task queue
// Event Loop는 우선적으로 Microtask queue를 확인
// Promise에 등록된 callback 함수는 Microtask queue에 들어감 (then에 등록한 callback func)
// click callback 이나 setTimeout callback 함수는 Task queue에 들어감

// 6. JavaScript Runtime Environment
// call stack이 비어 있으면 'Microtask queue가 빌 때까지' callback 함수를 하나씩 call stack으로 가져가서 실행
// call stack이 비어 있으면 task queue에 있는 'callback 함수를 하나 가져가서 실행하고 다시 loop'
// --> call stack에 있는 콜백 함수가 실행되고 나서 Rendering 되기 때문에 콜백 함수 안에서의 코드 순서는 상관없음
// --> 이미 준비가 된 상태에서 Rendering 되기 때문!

// 7. Request Animation Frame
// 브라우저의 화면이 업데이트되기 전에 콜백함수의 실행이 보장됨 