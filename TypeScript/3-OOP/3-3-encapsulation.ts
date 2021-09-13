{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 정보 은닉 (접근 제어자 사용)
  // public: 클래스 외부에서 접근 가능 (따로 명시하지 않아도 됨)
  // private: 클래스 외부에서 접근 불가
  // protected: 클래스를 상속한 자식 클래스에서만 접근 가능
  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT = 7; // class level (객체마다 생성되지 않음)
    private coffeeBeans = 0; // instance (object) level

    // 클래스를 이용하여 객체를 만들 때 처음으로 호출되는 함수
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    // 인자의 유효성 검사 (안정성)
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0!');
      }
      this.coffeeBeans += beans;
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
  maker.fillCoffeeBeans(3);
}
