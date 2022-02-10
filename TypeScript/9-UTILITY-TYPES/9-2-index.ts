{
  const obj = {
    name: 'sandy',
  };

  obj.name; // sandy
  obj['name']; // sandy

  type Animal = {
    name: string;
    age: number;
    gender: 'female' | 'male';
  };

  type Name = Animal['name']; // string
  const text: Name = 'dog';

  type Gender = Animal['gender']; // 'female' | 'male'

  type Keys = keyof Animal;
  const key: Keys = 'gender';

  type Person = {
    name: string;
    gender: Gender;
  };
  const person: Person = {
    name: 'sandy',
    gender: 'female',
  };
}
