import { ElementStates } from "../types/element-states";

class ListElem<T> {
  item!: T | string;
  state!: ElementStates;
}

export class List<T> {
  constructor(givenArr: ListElem<T>[]) {
    this.arr = givenArr;
  }
  arr: ListElem<T>[] = [];
  size = 4;
  head = 0;
  tail = this.size - 1;

  pushInHead = (item: ListElem<T>) => {
    this.arr.unshift(item);
  };

  removeHead = () => {
    this.arr.shift();
  };

  pushInTail = (item: ListElem<T>) => {
    this.arr.push(item);
  };

  removeTail = () => {
    this.arr.pop();
  };

  pushByIndex = (item: ListElem<T>, position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 0, item);
  };

  removeByIndex = (position: string) => {
    const num = Number(position);
    return this.arr.splice(num, 1);
  };

  getLastElem = (): ListElem<T> => {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.arr[i].item !== "") {
        return this.arr[i];
      }
    }
    return this.arr[0];
  };

  setDefaultColor = () => {
    for (let i = 0; i <= this.arr.length - 1; i++) {
      this.arr[i].state = ElementStates.Default;
    }
  };

  setHead = () => {
    this.head = 0;
  };

  setTail = () => {
    this.tail = this.arr.length - 1;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  isEmpty = () => {
    return this.arr.length === 0;
  };
}
