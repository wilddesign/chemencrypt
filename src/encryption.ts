import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'
import {Config, BasicCalculations, BasicSearches, BasicSelects } from './calculations'

export class PlausiblyDeniableChemicalEncryptionConfigs {
  isomerConfig: string
  propertyConfig: string
  numberOfCycles: number
  propertiesInterfered: string[]
  constructor(isomerConfig: 'all'|'single', propertyConfig: 'all'|'single', numberOfCycles: number, propertiesList: string[]){
    this.isomerConfig = isomerConfig
    this.propertyConfig = propertyConfig
    this.numberOfCycles = Math.floor(numberOfCycles)
    this.propertiesInterfered = propertiesList
  }
}

export class PlausiblyDeniableChemicalEncryption {
  readonly initialToBeEncrypted: MixtureOfChemicals
  readonly initialAvailableChemicals: Array<Chemical>
  readonly initialConfigs: Array<Config>
  readonly encryptParams: PlausiblyDeniableChemicalEncryptionConfigs
  readonly encryptedTypeChemical: Chemical

  toBeEncrypted: MixtureOfChemicals
  availableChemicals: Array<Chemical>
  configs: Array<Config>

  constructor(toBeEncrypted: MixtureOfChemicals, initialEncr: Chemical, availableChemicals: Array<Chemical>, configs: Array<Config>, encryptionParams: PlausiblyDeniableChemicalEncryptionConfigs){
    //initial configs, available chemicals, to be encrypted MixtureOfChemicals as const
    this.initialToBeEncrypted = toBeEncrypted
    this.toBeEncrypted = toBeEncrypted
    this.encryptedTypeChemical = initialEncr

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
    let escrow: Array<Chemical> = []
    for (let i = 0; i<this.encryptParams.numberOfCycles; i++){
      // select isomers
      let isomers: Array<Chemical> = BasicSearches.findIsomers(this.encryptedTypeChemical,this.availableChemicals)
      if(this.encryptParams.isomerConfig === 'single') {
        escrow = escrow.concat(BasicSelects.selectOneRandomly(isomers))
      } else if (this.encryptParams.isomerConfig === 'single') {
        escrow = escrow.concat(BasicSelects.selectAll(isomers))
      }
      //select interferents
      this.configs.forEach(param => {
        //find the property in this.encryptedTypeChemical
        let propOfInterest: Property = this.encryptedTypeChemical.properties.filter((prop) => {return prop.name === param.propertyName})[0]
        let configFittingTheParam: Config = this.configs.filter((conf) => {return conf.propertyName === param.propertyName})[0]
        let interferents: Array<Chemical> = BasicSearches.findAllChemicalsByPropCondition(propOfInterest, this.availableChemicals, configFittingTheParam)
        if(this.encryptParams.propertyConfig === 'single') {
          escrow = escrow.concat(BasicSelects.selectOneRandomly(interferents))
        } else if (this.encryptParams.propertyConfig === 'single') {
          escrow = escrow.concat(BasicSelects.selectAll(interferents))
        }
      });

      this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(escrow)
    }
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
