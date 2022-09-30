import { Property } from './property';
import { Chemical } from './chemical';
import { Config } from './config';
import { BasicCalculations } from './basicCalculations';

export class BasicSearches {
  static findAllChemicalsByPropCondition(propSearched: Property, input: Chemical[], config: Config): Chemical[] {
    return input.filter((entry) => {
      return entry.properties.some((property) => {
        return (
          property.name === propSearched.name &&
          BasicCalculations.isMatchByNumberInArrays(property.value, propSearched.value, config)
        );
      });
    });
  }

  static findIsomers(chemicalOfInterest: Chemical, input: Chemical[]): Chemical[] {
    return input.filter((entry) => BasicCalculations.isEqual(chemicalOfInterest.formula, entry.formula));
  }
}
