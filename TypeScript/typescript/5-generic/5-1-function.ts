{
  // number 타입만 구별할 수 있음
  function checkNotNullNumber(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  // 타입이 보장되지 않음
  function checkNotNullAny(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  // Generic Type
  // 어떤 타입이든 사용 가능 (유연성)
  // 컴파일 시간에 타입을 보장 받음
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  const number = checkNotNull(123);
  const boal = checkNotNull(true);
}
