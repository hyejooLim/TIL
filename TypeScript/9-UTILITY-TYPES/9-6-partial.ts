{
  // Partial Type

  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo: ToDo = {
    title: 'Learn TypeScript',
    description: 'study hard',
    label: 'play',
    priority: 'high',
  };

  const updatedTodo = updateTodo(todo, { label: 'study' });
  console.log(updatedTodo);
}
