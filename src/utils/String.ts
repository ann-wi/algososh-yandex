export const swapString = (
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex - firstIndex]] = [
    arr[secondIndex - firstIndex],
    arr[firstIndex],
  ];
};

export const testingStringReverse = (string: string): string[] => {
  const arr = string.split("");
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    swapString(arr, i, arr.length - 1);
  }
  return arr;
};
