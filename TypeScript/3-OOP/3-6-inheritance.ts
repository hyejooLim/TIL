{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
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

  // 상속: 공통 기능은 재사용하고 자식 클래스에서만 특화된 기능 수행
  // 오버라이딩: 자식 클래스에서 부모 클래스의 함수를 덮어 씌움
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

  const latteMachine = new CaffeeLatteMachine(32, 'ABCD');
  const coffee = latteMachine.makeCoffee(2);
  console.log(coffee);
  console.log(latteMachine.serialNumber);
}
