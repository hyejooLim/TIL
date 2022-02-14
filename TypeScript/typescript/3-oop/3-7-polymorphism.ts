{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT = 7;
    private coffeeBeans = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
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

    private extract(shots: number): CoffeeCup {
      console.log(`pulling coffee ${shots} shots...`);

      return {
        shots,
        hasMilk: false,
      };
    }

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

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  // 다형성: 동일한 인터페이스나 부모 클래스를 상속한 자식 클래스들이 각자의 방식으로 구성 (동일한 API 사용)
  // CoffeeCup에 설탕을 추가해주는 클래스
  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  const sweetCoffeeMaker = new SweetCoffeeMaker(32);
  const sweetCoffee = sweetCoffeeMaker.makeCoffee(1);
  console.log(sweetCoffee);

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(12),
    new CaffeeLatteMachine(12, 'S'),
    new SweetCoffeeMaker(12),
  ];

  machines.forEach((machine) => {
    console.log('-------------------------------');
    const result = machine.makeCoffee(1);
    console.log(result);
  });
}
