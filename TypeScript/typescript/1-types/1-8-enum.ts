{
  // Enum
  // 0부터 시작
  // 여러 개의 상수 값들을 한 곳에 모아 두어 타입이 안전하게 보장됨
  // But, 타입이 정확하게 보장되지 않음 -> Union 타입으로 대체하여 사용 ✨

  // JavaScript
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;
  console.log(dayOfToday); // 0

  // TypeScript
  enum Days { // 앞글자만 대문자
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday); // 1
  let day = Days.Sunday;
  console.log(day); // 7
  day = 10; // 👿 컴파일 에러 발생 x

  // ✨ Union으로 대체 -> 정확한 타입 보장
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  let dayOfWeek: DaysOfWeek;
  dayOfWeek = 'Wednesday';
}
