{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // abstract: 추상 클래스로 객체를 생성할 수 없음
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT = 7;
    private coffeeBeans = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0!');
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots} shots...`);

      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat() {
      console.log('heating...');
    }

    // 자식 클래스마다 달라질 수 있는 함수 앞에 'abstract' 키워드 붙이기
    // 자식 클래스마다 extract 함수를 구현해야 하기 때문에 protected 접근 제어자 사용
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeeLatteMachine extends CoffeeMachine {
    // constructor: 부모 클래스에서 필요한 데이터도 받아와야 함
    constructor(coffeeBeans: number, public serialNumber: string) {
      super(coffeeBeans); // super를 통해 전달
    }
    private steamMilk(): void {
      console.log('steaming milk...');
    }

    // 추상 클래스를 상속하는 클래스는 abstract 키워드가 붙은 함수를 구현해야 함
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // 추상 클래스를 상속하는 클래스는 abstract 키워드가 붙은 함수를 구현해야 함
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      }
    }
  }

  const sweetCoffeeMaker = new SweetCoffeeMaker(32);
  const sweetCoffee = sweetCoffeeMaker.makeCoffee(1);
  console.log(sweetCoffee);

  const machines: CoffeeMaker[] = [
    new CaffeeLatteMachine(12, 'S'),
    new SweetCoffeeMaker(12),
  ];

  machines.forEach((machine) => {
    console.log('-------------------------------');
    const result = machine.makeCoffee(1);
    console.log(result);
  });
}
