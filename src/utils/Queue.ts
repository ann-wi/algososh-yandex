export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  public head = 0;
  public tail = 0;
  public length: number = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длина");
    }

    this.container[this.tail % this.size] = item;
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("В очереди нет элементов");
    }

    delete this.container[this.head % this.size];
    this.head++;
  };

  isEmpty = () => this.length === 0;

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("В очереди нет элементов");
    }
    return this.container[this.head];
  };

  getElements = (): T[] => this.container;

  deleteElements = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isFull = (): boolean => {
    return this.tail === this.size;
  };
}
