// Condition Type

// 타입 T가 string을 상속하면 타입 T는 boolean 타입으로 결정됨
type Check<T> = T extends string ? boolean : number;
type Type = Check<string>; // boolean

type TypeName<T> = T extends string
  ? 'string'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

type T0 = TypeName<string>; // string
type T1 = TypeName<'a'>; // string
type T2 = TypeName<() => void>; // function
