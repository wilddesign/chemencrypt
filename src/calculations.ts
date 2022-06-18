import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'

export class Config {
  propertyName: string
  epsilon: number
  constructor(epsilon: number, propName: string){
    this.propertyName = propName
    this.epsilon = epsilon
  }
}


export class BasicCalculations {
  static isMatchByNumber(measure1: number, measure2: number, epsilon: number): boolean {
    return Math.abs(measure1-measure2)<=epsilon? true : false
  }

  static isMatchByNumberInArrays(measure1: number[], measure2: number[], conf: Config): boolean {
    //return true if isMatchByNumber return true for any combination of a measure 1 and a measure 2
    let resp = false
    measure1.forEach(val1 => {
      measure2.forEach(val2 => {
        if(BasicCalculations.isMatchByNumber(val1, val2, conf.epsilon)) {resp = true}
      });
    });
    return resp
  }

  static isEqual(measure1: string, measure2: string): boolean {
    return measure1 === measure2? true : false
  }
}

export class BasicSearches {

  static findAllChemicalsByPropCondition(propSearched: Property, input: Array<Chemical>, config: Config): Array<Chemical> {
    return input.filter((entry) => {
      return entry.properties.some((property) => {
        return property.name === propSearched.name && BasicCalculations.isMatchByNumberInArrays(property.value, propSearched.value, config)})
    })
  }

  static findIsomers(chemicalOfInterest: Chemical, input: Array<Chemical>): Array<Chemical> {
    return input.filter(entry => BasicCalculations.isEqual(chemicalOfInterest.formula, entry.formula))
  }
}

export class BasicSelects {

  static randomInteger(max: number, min: number): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static selectAll(candidates: Array<Chemical>): Array<Chemical>{
    return candidates
  }

  static selectOneRandomly(candidates: Array<Chemical>): Array<Chemical>{
    if (candidates.length === 0) {
      let res: Array<Chemical> = []
      return res
    } else if (candidates.length === 1) {
      return candidates
    } else {
      return [candidates[this.randomInteger(candidates.length-1, 0)]]
    }
  }
}
