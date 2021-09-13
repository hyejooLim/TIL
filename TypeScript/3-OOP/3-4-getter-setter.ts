{
  /** 1
  class User {
    firstName: string;
    lastName: string;
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  **/

  /** 2
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    constructor(private firstName: string, private lastName: string) {}
  }
  **/

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private internalAge = 22; // 외부에서 접근 불가
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) { // 유효성 검사
        throw new Error('Invalid number!');
      }
      this.internalAge = num;
    }

    // constructor에서 접근제어자를 설정하면 멤버 변수로 설정됨
    constructor(private firstName: string, private lastName: string) {}
  }

  const user = new User('Steve', 'Jobs');
  console.log(user.fullName); // 멤버 변수에 접근하는 것처럼 접근 (함수처럼 접근 x)
  user.age = 23; // setter 호출
  console.log(user.age);
}
