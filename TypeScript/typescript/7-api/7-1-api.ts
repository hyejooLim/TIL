Array;

type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: true },
];

// every: 하나라도 false이면 종료하고 false 반환 (아니면 true 반환)
const result = students.every((student) => student.passed);
console.log(result);

// =====================================================================

class Animal {}
class Dog implements Animal {
  isDog: boolean = true;
}
class Cat implements Animal {
  isCat: boolean = false;
}

const animals: Animal[] = [new Dog(), new Dog(), new Cat()];
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isDog !== undefined;
}
// 모두 Dog가 이니면 false 반환
const result2 = animals.every<Dog>(isDog);
console.log(result2);
