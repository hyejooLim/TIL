{
  // 문자열을 담는 스택 구현

  interface Stack {
    readonly size: number;
    push(value: string): void; // 문자열을 스택에 삽입
    pop(): string; // 문자열을 스택에서 제거
  }

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
  };

  // Stack에서 규약된 모든 아이들을 구현해줘야 함
  class StackImpl implements Stack {
    private _size: number = 0; // 클래스 외부에서 변경 불가
    private head?: StackNode;

    get size() {
      return this._size;
    }

    push(value: string) {
      const node: StackNode = {
        value,
        next: this.head,
      };
      this.head = node;
      this._size++;
    }

    // null == undefined, null !== undefined
    pop(): string {
      if (this.head == null) {
        throw new Error('stack is empty!');
      }

      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl();
  stack.push('sandy');
  stack.push('is');
  stack.push('name');
  stack.push('my');
  stack.push('Hello');
  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  stack.pop(); // Error
}
