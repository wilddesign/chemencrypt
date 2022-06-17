import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'
import {Config, BasicCalculations, BasicSearches, BasicSelects } from './calculations'


export class PlausiblyDeniableChemicalEncryption {
  readonly initialToBeEncrypted: MixtureOfChemicals
  readonly initialAvailableChemicals: Array<Chemical>
  readonly initialConfigs: Array<Config>

  toBeEncrypted: MixtureOfChemicals
  availableChemicals: Array<Chemical>
  configs: Array<Config>

  constructor(toBeEncrypted: MixtureOfChemicals, availableChemicals: Array<Chemical>, configs: Array<Config>){
    //initial configs, available chemicals, to be encrypted MixtureOfChemicals as const
    this.initialToBeEncrypted = toBeEncrypted
    this.toBeEncrypted = toBeEncrypted

    this.initialAvailableChemicals = availableChemicals
    this.availableChemicals = availableChemicals

    this.initialConfigs = configs
    this.configs = configs
    //+ working copy
    // a function that adds appropriate new component chemicals
  }

}
