{
  // Type Assertions 👿
  // ** 타입이라고 호언장담
  // 타입을 100% 장담할 때만 사용하는 것이 좋음

  function jsStrFunc(): any {
    return 'happy';
  }
  const result = jsStrFunc();
  console.log((result as string).length); // 5
  console.log((<string>result).length); // 5

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 👿

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  numbers!.push(1); // ! -> numbers에 값이 있다고 장담
}
