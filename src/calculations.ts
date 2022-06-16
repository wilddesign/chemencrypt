import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'

export class Config {
  epsilon: number
  constructor(epsilon: number){
    this.epsilon = epsilon
  }
}

/*interface CalculateInterferentMixture {
  calculateInterferentMixture(toBeEncrypted: Chemical, availableChemicals: Chemical[], config: Config): MixtureOfChemicals
}*/

export class BasicCalculations {
  static isMatchByNumber(measure1: number, measure2: number, epsilon: number): boolean {
    return Math.abs(measure1-measure2)<=epsilon? true : false
  }
  static isEqual(measure1: string, measure2: string): boolean {
    return measure1 === measure2? true : false
  }
}

export class BasicSearches {

  /*static findAllChemicalsByPropCondition(propSearched: Property, input: Array<Chemical>, config: Config): Array<Chemical> {
    let result = []: Array<Chemical>
    input.forEach(chemical => {
      chemical.properties.forEach(prop => {
        if(prop.name === propSearched.name && BasicCalculations.isMatchByNumber(prop.value, propSearched.value, config.epsilon)) {
          result.push(chemical)
        }
      });
    });
    return result
  }*/

  static findIsomers(chemicalOfInterest: Chemical, input: Array<Chemical>): Array<Chemical> {
    /*let result = []: Array<Chemical>
    input.forEach(chemical => {
        if(BasicCalculations.isEqual(chemicalOfInterest.formula, chemical.formula)) {
          result.push(chemical)
        }
    });*/
    return input.filter(entry => BasicCalculations.isEqual(chemicalOfInterest.formula, entry.formula))
  }
}

/*export class BasicSelects {

}*/

export class Calculator {
  constructor(){
  }

  /*static calculateInterferentMixture(toBeEncrypted: Chemical, availableChemicals: Chemical[], config: Config): MixtureOfChemicals (){

  }*/
}
