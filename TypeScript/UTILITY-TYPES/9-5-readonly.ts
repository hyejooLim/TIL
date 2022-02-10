{
  // ReadOnly Type

  // 읽기만 가능! 값 변경 불가
  type ToDo = {
    title: string;
    description: string;
  };

  function display(todo: ReadOnly<ToDo>) {
    // todo.title = 'play';
  }
}
