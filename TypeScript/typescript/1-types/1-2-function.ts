{
  // JavaScript 👿
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript ✨
  function tsAdd(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript 👿
  function jsFetchNum(id) {
    // ...code
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // TypeScript ✨
  function tsFetchNum(id: string): Promise<number> {
    // ...code
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // JavaScript ✨ => TypeScript
  // Optional Parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName('Steve', 'Jobs');
  printName('Anna'); // lastName은 선택사항
  printName('Tom', undefined);

  // Default Parameter
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

  // Rest Parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  addNumbers(1, 2);
  addNumbers(1, 2, 3, 4, 5);
}
