export class Property {
  name: string;
  value: number[];

  constructor(name: string, value: number | number[]) {
    this.name = name;
    if (Array.isArray(value)) {
      this.value = value.sort((a, b) => {
        return a - b;
      });
    } else {
      this.value = [value];
    }
  }
}
