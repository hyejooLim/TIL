// Type vs Interface

// type: 데이터를 담을 목적일 경우 사용
// interface: 이를 통해 무언가를 구현할 목적이라면 사용
type PositionType = {
  x: number;
  y: number;
};

interface PositionInterface {
  x: number;
  y: number;
}

// Object
const obj1: PositionType = {
  x: 1,
  y: 1,
};

const obj2: PositionInterface = {
  x: 1,
  y: 1,
  z: 1,
};

// Extends
type ZPositionType = PositionType & {
  z: number;
};

interface ZPositionInterface extends PositionInterface {
  z: number;
}

// Only interface can be merged.
interface PositionInterface {
  z: number;
}

// type PositionType = {

// }

// class
class Pos1 implements PositionType {
  x: number;
  y: number;
}

class Pos2 implements PositionInterface {
  x: number;
  y: number;
  z: number;
}

// Type aliases can use computed properties
type Person = {
  name: string;
  age: number;
};
type Name = Person['name']; // string

type NumberType = number;
type Direction = 'left' | 'right' | 'up' | 'down';
