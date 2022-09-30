import { Config } from './config';

export class BasicCalculations {
  static isMatchByNumber(measure1: number, measure2: number, epsilon: number): boolean {
    return Math.abs(measure1 - measure2) <= epsilon ? true : false;
  }

  static isMatchByNumberInArrays(measure1: number[], measure2: number[], conf: Config): boolean {
    // return true if isMatchByNumber return true for any combination of a measure 1 and a measure 2
    let resp = false;
    measure1.forEach((val1) => {
      measure2.forEach((val2) => {
        if (BasicCalculations.isMatchByNumber(val1, val2, conf.epsilon)) {
          resp = true;
        }
      });
    });
    return resp;
  }

  static isEqual(measure1: string, measure2: string): boolean {
    return measure1 === measure2 ? true : false;
  }
}
