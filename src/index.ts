export {Calculator, Config} from './calculations'

export class Property {
  name: string
  value: string | number | string[] | number[]

  constructor(name: string, value: string | number | string[] | number[]){
    this.name = name
    this.value = value
  }
}

interface ExposePropertyValueByName {
  exposePropertyValueByName(name: string): string | number | string[] | number[]
}

export class Chemical implements ExposePropertyValueByName {
  name: string
  formula: string
  properties: Array<Property>

  constructor (name: string, formula: string, props: Array<Property>){
    this.name = name
    this.formula = formula
    //check if duplicate props
    if (props.length != new Set(props.map(prop => prop.name)).size){
      //console.log(props.length != new Set(props.map(prop => prop.name)).size,props, new Set(props.map(prop => prop.name)))
      throw new Error('Duplicate property name!')
    }
    this.properties = props
  }

  exposePropertyValueByName(name:string) {
    let filtered = this.properties.filter((property) => property.name === name)
    if (filtered.length > 1) {
      throw new Error('Duplicate property name!')
    }
    return filtered[0].value
  }
}

export class ComponentChemical extends Chemical {
  quantity: number
  constructor(chemical: Chemical, qty: number){
    super(chemical.name, chemical.formula, chemical.properties)
    this.quantity = qty
  }
}

export class MixtureOfChemicals {
  name: string
  description: string
  components: Array<ComponentChemical>
  constructor(name: string, description: string, components: Array<ComponentChemical>){
    this.name = name
    this.description = description
    this.components = components
  }
}

/*export class EncryptedMixtureOfChemicals {
  name: string
  description: string
  components: Array<ComponentChemical>
  toBeEncrypted: Chemical
  constructor(name: string, description = "", toBeEncrypted: Chemical, availableComponents: Array<Chemical>) {
    this.name = name
    this.description = description
    this.toBeEncrypted = toBeEncrypted
    this.components = this.generateInterferentMixture(toBeEncrypted, availableComponents)
  }

  generateInterferentMixture(toBeEncrypted: Chemical, availableComponents: Array<Chemical>): Array<ComponentChemical> {
    //generates encrypted toBeEncrypted in a mixture of components and returns the mixture composition by assigning quantities to each of then
    //components from the array of availableComponents
    return [new ComponentChemical(toBeEncrypted, 1)]
  }
}*/
//moleculeRepresentation
//component = molecule + quantity
//mixtureRepresentation
//signalsRepresentation
// signalRepresentation
//a single moleculeRepresentation can be assigned to a single vector of signalsRepresentation and pushed to mixtureRepresentation of the mixture
// then for this mixture, another vector can be assigned (and added compound) that is near any of the mixture's signal
// this operation can be repeated n-times for each signal


//findByPropertyDiffLessThanEpsilon(property, value, epsilon)




// how to describe reactions of the encryptee with the interferents?


//Can amphetamin become no longer controlled with plausibly deniable chemical encryption? An in silico study
/*In this article we present an algorithm of plausibly deniable chemical encryption and its use to render
the cost of amphetamin identification in a sample higher, thus protecting it from being identified.

*/
