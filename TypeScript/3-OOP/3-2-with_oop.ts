{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 클래스 내부의 멤버 변수에 접근할 경우, 'this.'을 붙여줘야 함
  // static: 클래스 내부가 아닌 클래스 자체의 정보이기 때문에 'this.'가 아니라 '클래스명.'을 붙여줘야 함
  class CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT = 7; // class level (객체마다 생성되지 않음)
    coffeeBeans = 0; // instance (object) level

    // 클래스를 이용하여 객체를 만들 때 처음으로 호출되는 함수
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32); // 클래스를 이용하여 객체를 만듦
  console.log(maker);
  const maker2 = CoffeeMaker.makeMachine(14); // 클래스 레벨의 함수를 이용하여 객체를 만듦
  console.log(maker2);
}
