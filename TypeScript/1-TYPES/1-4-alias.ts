{
  // Type Aliases
  // 타입을 새로 정의할 수 있음
  type Text = string;
  const name: Text = 'sandy'; // name에는 string 타입만 할당 가능

  type Num = number;
  const age: Num = 12; // age에는 number 타입만 할당 가능

  type Student = {
    name: string;
    age: number;
  };
  const student: Student = { // student에는 Student 타입만 할당 가능
    name: 'sandy',
    age: 12,
  };

  // String Literal Types
  type Name = 'name';
  const myName: Name = 'name'; // 'name'만 할당 가능

  type boal = true;
  const isDog: boal = true; // true만 할당 가능
}
