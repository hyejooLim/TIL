{
  // Array
  const fruits: string[] = ['🍎', '🍋'];
  const scores: Array<number> = [1, 2, 3];
  function printArray(fruits: readonly string[]) {}

  // Tuple
  // -> interface, type alias, class로 대체하여 사용하는 것이 좋음
  let student: [string, number];
  student = ['sandy', 12];
  student[0]; // sandy
  student[1]; // 12
  const [name, age] = student; // object destructuring
}
