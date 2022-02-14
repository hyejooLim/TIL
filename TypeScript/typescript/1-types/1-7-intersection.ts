{
  // Intersection Types: And

  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    employeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.score, person.work());
  }

  // Student와 Worker 속성을 모두 작성해야 함
  internWork({
    name: 'sandy',
    score: 100,
    employeeId: 3,
    work: () => {},
  });
}
