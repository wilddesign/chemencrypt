import { MixtureOfChemicals } from './mixtureOfChemicals';
import { Chemical } from './chemical';
import { Config } from './config';
import { PlausiblyDeniableChemicalEncryptionConfigs } from './plausiblyDeniableChemicalEncryptionConfigs';
import { multipleOverlap } from './multipleOverlap';
import { BasicSearches } from './basicSearches';
import { BasicSelects } from './basicSelects';
import { BasicCalculations } from './basicCalculations';
import { Property } from './property';
import { ComponentChemical } from './componentChemical';
import { SetMeasures } from './setMeasures';

export class PlausiblyDeniableChemicalEncryption {
  readonly initialToBeEncrypted: MixtureOfChemicals;
  readonly initialAvailableChemicals: Chemical[];
  readonly initialConfigs: Config[];
  readonly encryptParams: PlausiblyDeniableChemicalEncryptionConfigs;

  encryptedTypeChemicalsList: Chemical[];
  toBeEncrypted: MixtureOfChemicals;
  availableChemicals: Chemical[];
  configs: Config[];

  constructor(
    toBeEncrypted: MixtureOfChemicals,
    initialEncr: Chemical[],
    availableChemicals: Chemical[],
    configs: Config[],
    encryptionParams: PlausiblyDeniableChemicalEncryptionConfigs,
  ) {
    this.initialToBeEncrypted = toBeEncrypted;
    this.toBeEncrypted = toBeEncrypted;
    this.encryptedTypeChemicalsList = initialEncr;

    this.initialAvailableChemicals = availableChemicals;
    this.availableChemicals = availableChemicals;

    this.initialConfigs = configs;
    this.configs = configs;

    this.encryptParams = encryptionParams;
  }

  encrypt() {
    this.encryptedTypeChemicalsList.forEach((encryptedTypeChemical) => {
      let escrow: Chemical[] = [];
      for (let i = 0; i < this.encryptParams.numberOfCycles; i++) {
        // select isomers
        escrow = [];
        const isomers: Chemical[] = BasicSearches.findIsomers(encryptedTypeChemical, this.availableChemicals);
        if (this.encryptParams.isomerConfig === 'single') {
          escrow = escrow.concat(BasicSelects.selectOneRandomly(isomers));
        } else if (this.encryptParams.isomerConfig === 'all') {
          escrow = escrow.concat(BasicSelects.selectAll(isomers));
        }
        if (escrow.length) {
          this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(escrow);
        }

        // select interferents
        this.encryptParams.propertiesInterfered.forEach((param) => {
          escrow = [];
          // find the property in this.encryptedTypeChemical
          const propOfInterest: Property = encryptedTypeChemical.properties.filter((prop) => {
            return prop.name === param;
          })[0];

          const configFittingTheParam: Config = this.configs.filter((conf) => {
            return conf.propertyName === param;
          })[0];
          if (configFittingTheParam !== undefined && propOfInterest !== undefined) {
            const interferents: Chemical[] = BasicSearches.findAllChemicalsByPropCondition(
              propOfInterest,
              this.availableChemicals,
              configFittingTheParam,
            );
            if (this.encryptParams.propertyConfig === 'single') {
              escrow = escrow.concat(BasicSelects.selectOneRandomly(interferents));
            } else if (this.encryptParams.propertyConfig === 'all') {
              escrow = escrow.concat(BasicSelects.selectAll(interferents));
            }
            if (escrow.length) {
              this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(escrow);
            }
          }
        });
      }
    });
  }

  returnEncryptedMixture(): MixtureOfChemicals {
    return this.toBeEncrypted;
  }

  returnEncryptedMixtureChemicalsList(): Chemical[] {
    return this.encryptedTypeChemicalsList;
  }

  protected randomRealInRange(start: number, stop: number) {
    return start + Math.random() * (stop - start);
  }

  protected moveChemicalsFromAvailableChemicalsToToBeEncrypted(list: Chemical[]) {
    this.removeFromAvailableChemicals(list);
    const newComponents: ComponentChemical[] = [];
    list.forEach((chemical) => {
      newComponents.push(new ComponentChemical(chemical, this.randomRealInRange(0, 2)));
    });
    this.toBeEncrypted.addNewComponents(newComponents);
    this.encryptedTypeChemicalsList = this.encryptedTypeChemicalsList.concat(list);
  }

  protected removeFromAvailableChemicals(list: Chemical[]) {
    list.forEach((chemicalToBeRemoved) => {
      this.moveFromTo(chemicalToBeRemoved);
    });
  }

  protected moveFromTo(chemicalChosen: Chemical) {
    const index = this.availableChemicals.findIndex((chemical) => {
      return chemical.name === chemicalChosen.name;
    });

    this.availableChemicals.splice(index, 1);
  }

  protected convertMultipleOverlapTypeToOverlapStats(
    multipleOverlapObject: multipleOverlap,
    name: string,
  ): overlapStats {
    return {
      configName: name,
      sumOfOverlapAreas: multipleOverlapObject.sumOfOverlapAreas,
      numberOfOverlappingSignals: multipleOverlapObject.numberOfOverlappingSignals,
    };
  }

  calculateOverlapStats(comparedChemical: Chemical): overlapStats[] {
    const result: overlapStats[] = [];
    this.configs.forEach((conf) => {
      const mixtureSignalsForConf = this.returnEncryptedMixture().properties.filter((property) => {
        return property.name === conf.propertyName;
      });
      const stats = SetMeasures.calculateOverlapOfMultipleSignalsWithMultipleSignals(
        conf.epsilon,
        mixtureSignalsForConf[0].value,
        comparedChemical.exposePropertyValueByName(conf.propertyName),
      );

      result.push(this.convertMultipleOverlapTypeToOverlapStats(stats, conf.propertyName));
    });

    return result;
  }
}
