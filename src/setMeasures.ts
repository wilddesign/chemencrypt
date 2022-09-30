import { multipleOverlap } from './multipleOverlap';

export class SetMeasures {
  static calculateOverlapAreaOfTwoSignals(epsilon: number, signal1: number, signal2: number): number {
    const max = this.signalArea(epsilon);
    if (Math.abs(signal1 - signal2) > 2 * epsilon) {
      return 0;
    } else {
      return max - Math.abs(signal1 - signal2);
    }
  }

  static signalArea(epsilon: number): number {
    return 2 * epsilon;
  }

  static calculateOverlapsOfASignalWithMultipleSignals(
    epsilon: number,
    singleSignal: number,
    multipleSignals: number[],
  ): multipleOverlap {
    const result = {
      sumOfOverlapAreas: 0,
      numberOfOverlappingSignals: 0,
    };
    multipleSignals.forEach((signalFromMultiple) => {
      const overlap = this.calculateOverlapAreaOfTwoSignals(epsilon, singleSignal, signalFromMultiple);
      if (overlap > 0) {
        result.sumOfOverlapAreas += overlap;
        result.numberOfOverlappingSignals++;
      }
    });
    return result;
  }

  static calculateOverlapOfMultipleSignalsWithMultipleSignals(
    epsilon: number,
    multipleSignals1: number[],
    multipleSignals2: number[],
  ): multipleOverlap {
    const result = {
      sumOfOverlapAreas: 0,
      numberOfOverlappingSignals: 0,
    };
    multipleSignals1.forEach((signalFromMultiple1) => {
      const overlap = this.calculateOverlapsOfASignalWithMultipleSignals(
        epsilon,
        signalFromMultiple1,
        multipleSignals2,
      );
      if (overlap.sumOfOverlapAreas > 0) {
        result.sumOfOverlapAreas += overlap.sumOfOverlapAreas;
        result.numberOfOverlappingSignals += overlap.numberOfOverlappingSignals;
      }
    });
    return result;
  }
}
