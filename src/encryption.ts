import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'
import {Config, BasicCalculations, BasicSearches, BasicSelects } from './calculations'

export class PlausiblyDeniableChemicalEncryptionConfigs {
  isomerConfig: 'all'|'single'
  propertyConfig: 'all'|'single'
  numberOfCycles: number
  constructor(isomerConfig: 'all'|'single', propertyConfig: 'all'|'single', numberOfCycles: number){
    this.isomerConfig = isomerConfig
    this.propertyConfig = propertyConfig
    this.numberOfCycles = Math.floor(numberOfCycles)
  }
}

export class PlausiblyDeniableChemicalEncryption {
  readonly initialToBeEncrypted: MixtureOfChemicals
  readonly initialAvailableChemicals: Array<Chemical>
  readonly initialConfigs: Array<Config>
  readonly encryptParams: PlausiblyDeniableChemicalEncryptionConfigs

  toBeEncrypted: MixtureOfChemicals
  availableChemicals: Array<Chemical>
  configs: Array<Config>

  constructor(toBeEncrypted: MixtureOfChemicals, availableChemicals: Array<Chemical>, configs: Array<Config>, encryptionParams: PlausiblyDeniableChemicalEncryptionConfigs){
    //initial configs, available chemicals, to be encrypted MixtureOfChemicals as const
    this.initialToBeEncrypted = toBeEncrypted
    this.toBeEncrypted = toBeEncrypted

    this.initialAvailableChemicals = availableChemicals
    this.availableChemicals = availableChemicals

    this.initialConfigs = configs
    this.configs = configs

    this.encryptParams = encryptionParams
    //+ working copy
    // a function that adds appropriate new component chemicals
  }

  encrypt(){
    //transforms the this.toBeEncrypted by first selecting and then adding proper interferents
    //select proper interferents
    //modify the mixture
    //find all isomers.
    //then find all interferents for all prop names
    //let chosenInterferents: Array<Chemical> = []
    //this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(chosenInterferents)
  }

  returnEncryptedMixture(): MixtureOfChemicals{
    return this.toBeEncrypted
  }

  protected randomRealInRange(start: number,stop: number){
    return start+Math.random()*(stop-start)
  }

  protected moveChemicalsFromAvailableChemicalsToToBeEncrypted(list: Array<Chemical>){
    this.removeFromAvailableChemicals(list)
    let newComponents: ComponentChemical[] = []
    list.forEach(chemical => {
      newComponents.push(new ComponentChemical(chemical,this.randomRealInRange(.5,2)))
    });
    this.toBeEncrypted.addNewComponents(newComponents)
  }

  protected removeFromAvailableChemicals(list: Array<Chemical>){
    list.forEach(chemicalToBeRemoved => {
      this.moveFromTo(chemicalToBeRemoved)
    });

  }


  protected moveFromTo(chemicalChosen: Chemical){
    let index = this.availableChemicals.findIndex((chemical) => {
      return chemical.name === chemicalChosen.name
    })

    this.availableChemicals.splice(index,1)
  }

}
