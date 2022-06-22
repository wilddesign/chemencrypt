import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from './index'
import {Config, BasicCalculations, BasicSearches, BasicSelects } from './calculations'
import {SetMeasures} from './setmeasures'


export class PlausiblyDeniableChemicalEncryptionConfigs {
  isomerConfig: string
  propertyConfig: string
  numberOfCycles: number
  propertiesInterfered: string[]
  constructor(isomerConfig: string, propertyConfig: string, numberOfCycles: number, propertiesList: string[]){
    this.isomerConfig = isomerConfig
    this.propertyConfig = propertyConfig
    this.numberOfCycles = Math.floor(numberOfCycles)
    this.propertiesInterfered = propertiesList
  }
}

type encryptionStats = {
  measure: number
}

export class PlausiblyDeniableChemicalEncryption {
  readonly initialToBeEncrypted: MixtureOfChemicals
  readonly initialAvailableChemicals: Array<Chemical>
  readonly initialConfigs: Array<Config>
  readonly encryptParams: PlausiblyDeniableChemicalEncryptionConfigs

  encryptedTypeChemicalsList: Array<Chemical>
  toBeEncrypted: MixtureOfChemicals
  availableChemicals: Array<Chemical>
  configs: Array<Config>

  constructor(toBeEncrypted: MixtureOfChemicals, initialEncr: Array<Chemical>, availableChemicals: Array<Chemical>, configs: Array<Config>, encryptionParams: PlausiblyDeniableChemicalEncryptionConfigs){
    //initial configs, available chemicals, to be encrypted MixtureOfChemicals as const
    this.initialToBeEncrypted = toBeEncrypted
    this.toBeEncrypted = toBeEncrypted
    this.encryptedTypeChemicalsList = initialEncr

    this.initialAvailableChemicals = availableChemicals
    this.availableChemicals = availableChemicals

    this.initialConfigs = configs
    this.configs = configs

    this.encryptParams = encryptionParams
    //+ working copy
    // a function that adds appropriate new component chemicals
  }

  encrypt(){
    this.encryptedTypeChemicalsList.forEach(encryptedTypeChemical => {
      let escrow: Array<Chemical> = []
      for (let i = 0; i<this.encryptParams.numberOfCycles; i++){
        // select isomers
        escrow = []
        let isomers: Array<Chemical> = BasicSearches.findIsomers(encryptedTypeChemical,this.availableChemicals)
        if(this.encryptParams.isomerConfig === 'single') {
          escrow = escrow.concat(BasicSelects.selectOneRandomly(isomers))
        } else if (this.encryptParams.isomerConfig === 'all') {
          escrow = escrow.concat(BasicSelects.selectAll(isomers))
        } else if (this.encryptParams.isomerConfig === 'none') {}
        if(escrow.length){
          this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(escrow)
        }

        //select interferents
        this.encryptParams.propertiesInterfered.forEach(param => {
          escrow = []
          //find the property in this.encryptedTypeChemical
          let propOfInterest: Property = encryptedTypeChemical.properties.filter((prop) => {return prop.name === param})[0]

          let configFittingTheParam: Config = this.configs.filter((conf) => {return conf.propertyName === param})[0]
          if (configFittingTheParam !== undefined && propOfInterest !== undefined){
            let interferents: Array<Chemical> = BasicSearches.findAllChemicalsByPropCondition(propOfInterest, this.availableChemicals, configFittingTheParam)
            if(this.encryptParams.propertyConfig === 'single') {
              escrow = escrow.concat(BasicSelects.selectOneRandomly(interferents))
            } else if (this.encryptParams.propertyConfig === 'all') {
              escrow = escrow.concat(BasicSelects.selectAll(interferents))
            }
            if(escrow.length){
              this.moveChemicalsFromAvailableChemicalsToToBeEncrypted(escrow)
            }
          }
        });
      }
    });
  }


  returnEncryptedMixture(): MixtureOfChemicals{
    return this.toBeEncrypted
  }

  returnEncryptedMixtureChemicalsList(): Array<Chemical>{
    return this.encryptedTypeChemicalsList
  }

  protected randomRealInRange(start: number,stop: number){
    return start+Math.random()*(stop-start)
  }

  protected moveChemicalsFromAvailableChemicalsToToBeEncrypted(list: Array<Chemical>){
    this.removeFromAvailableChemicals(list)
    let newComponents: ComponentChemical[] = []
    list.forEach(chemical => {
      newComponents.push(new ComponentChemical(chemical,this.randomRealInRange(0,2)))
    });
    this.toBeEncrypted.addNewComponents(newComponents)
    this.encryptedTypeChemicalsList = this.encryptedTypeChemicalsList.concat(list)
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

  calculateStats(propertyNames: Config[]) {
    //for each propertyName signal in the analyte, calculate the
    // Lebesgue measures that pertain to the encryption efficiency,
    // namely, overlap of analyte and interferents signals
    // take epsilon from this.configs
    return this.toBeEncrypted
  }

}
