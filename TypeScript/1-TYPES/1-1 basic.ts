{
  /**
   * JavaScript
   * primitive: number, string, boolean, bigint, undefined, null, symbol
   * Object: function, array...
   **/

  // number
  const num: number = 1;

  // string
  const str: string = 'happy';

  // boolean
  const bool: boolean = true;

  // undefined
  let name: undefined; // 👿
  let age: number | undefined;
  age = 23;
  age = undefined;
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null; // 👿
  let person2: string | null;

  // unknown 👿
  let notSure: unknown;
  notSure = 1;
  notSure = 'happy';

  // any 👿
  let anything: any;
  anything = 1;
  anything = 'happy';

  // void (생략 가능)
  function print(): void {
    console.log('hello');
    return; // void는 이것이 생략된 것
  }
  let unusable: void = undefined; // 👿

  // never
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message);
    while (true) {}
  }

  // object
  let obj: object; // 👿
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'joo' });
  acceptSomeObject({ age: '23' });
}
