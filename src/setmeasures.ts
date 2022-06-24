
export type multipleOverlap = {
  sumOfOverlapAreas: number
  numberOfOverlappingSignals: number
}

export class SetMeasures {

    static calculateOverlapAreaOfTwoSignals(epsilon: number, signal1: number, signal2: number): number{
      let max = this.signalArea(epsilon)
      if(Math.abs(signal1-signal2) > 2*epsilon) {
        return 0
      } else {
        return max - Math.abs(signal1-signal2)
      }
    }

    static signalArea(epsilon: number): number{
      return 2*epsilon
    }

    static calculateOverlapsOfASignalWithMultipleSignals(epsilon: number, singleSignal: number, multipleSignals: number[]): multipleOverlap{
      let result = {
        sumOfOverlapAreas: 0,
        numberOfOverlappingSignals: 0
      }
      multipleSignals.forEach(signalFromMultiple => {
        let overlap = this.calculateOverlapAreaOfTwoSignals(epsilon, singleSignal, signalFromMultiple)
        if (overlap > 0) {
          result.sumOfOverlapAreas += overlap
          result.numberOfOverlappingSignals++
        }
      });
      return result
    }

    static calculateOverlapOfMultipleSignalsWithMultipleSignals(epsilon: number, multipleSignals1: number[], multipleSignals2: number[]): multipleOverlap{
      let result = {
        sumOfOverlapAreas: 0,
        numberOfOverlappingSignals: 0
      }
      multipleSignals1.forEach(signalFromMultiple1 => {
        let overlap = this.calculateOverlapsOfASignalWithMultipleSignals(epsilon, signalFromMultiple1, multipleSignals2)
        if (overlap.sumOfOverlapAreas > 0) {
          result.sumOfOverlapAreas += overlap.sumOfOverlapAreas
          result.numberOfOverlappingSignals++
        }
      });
      return result
    }
}
