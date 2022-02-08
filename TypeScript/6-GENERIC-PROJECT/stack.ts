{
  // 모든 타입을 담는 스택 구현
  // 4-OOP-PROJECT > stack.ts을 Generic을 사용하여 재구현하기

  // Stack 인터페이스는 T 타입을 받을 수 있음
  interface Stack<T> {
    readonly size: number;
    push(value: T): void; // 아이템을 스택에 삽입
    pop(): T; // 아이템을 스택에서 제거
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };

  // Stack에서 규약된 모든 아이들을 구현해줘야 함
  class StackImpl<T> implements Stack<T> {
    private _size: number = 0; // 클래스 외부에서 변경 불가
    private head?: StackNode<T>;

    get size() {
      return this._size;
    }

    push(value: T) {
      const node = {
        value,
        next: this.head,
      };
      this.head = node;
      this._size++;
    }

    // null == undefined, null !== undefined
    pop(): T {
      if (this.head == null) {
        throw new Error('stack is empty!');
      }

      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl<string>();
  stack.push('sandy');
  stack.push('is');
  stack.push('name');
  stack.push('my');
  stack.push('Hello');
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  const stack2 = new StackImpl<number>();
  stack2.push(3);
  stack2.push(2);
  stack2.push(1);
  while (stack2.size !== 0) {
    console.log(stack2.pop());
  }

  stack.pop(); // Error
}
