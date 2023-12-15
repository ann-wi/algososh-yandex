export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  arr: () => T[];
  peak: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  arr = (): T[] => {
    return this.container;
  };

  getLength(): number {
    return this.container.length;
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  peak = (): number => {
    return this.getLength() - 1;
  };
}
