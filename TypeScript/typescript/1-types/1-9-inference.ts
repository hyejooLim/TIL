{
  // Type Inference
  // 타입스크립트가 알아서 타입을 추론함
  // 그러나 타입을 명시해주는 것이 좋음 ✨

  let text = 'hello'; // text: string

  function print(message = 'default message') {
    console.log(message);
  }
  print('happy');

  function add(x: number, y: number) {
    return x + y; // number 타입으로 유추
  }
  const result = add(2, 3); // number 타입으로 유추
}
