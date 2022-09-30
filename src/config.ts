export class Config {
  propertyName: string;
  epsilon: number;
  constructor(epsilon: number, propName: string) {
    this.propertyName = propName;
    this.epsilon = epsilon;
  }
}
