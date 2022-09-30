import { Chemical } from './chemical';

export class BasicSelects {
  static randomInteger(max: number, min: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static selectAll(candidates: Chemical[]): Chemical[] {
    return candidates;
  }

  static selectOneRandomly(candidates: Chemical[]): Chemical[] {
    if (candidates.length === 0) {
      return [] as Chemical[];
    } else if (candidates.length === 1) {
      return candidates;
    } else {
      return [candidates[this.randomInteger(candidates.length - 1, 0)]];
    }
  }
}
