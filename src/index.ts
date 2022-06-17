export {Calculator, Config} from './calculations'

export class Property {
  name: string
  value: number[]

  constructor(name: string, value: number | number[]){
    this.name = name
    if (Array.isArray(value)){
      this.value = value
    } else {
      this.value = [value]
    }
  }
}

interface ExposePropertyValueByName {
  exposePropertyValueByName(name: string): number[]
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
  properties: Array<Property>
  constructor(name: string, description: string, components: Array<ComponentChemical>){
    this.name = name
    this.description = description
    this.components = components
    this.properties = this.calculateSummaryProperty(this.components)
  }

  protected mergeAllComponentPropertiesIntoOne(): Array<Property>{
    let result: Array<Property> = []
    this.components.forEach(component => {
        result = result.concat(component.properties)
    });
    return result
  }

  protected filterPropertiesByName(name: string): Array<Property>{
    let allProperties = this.mergeAllComponentPropertiesIntoOne()
    return allProperties.filter((property) => {
      return property.name === name
    })
  }

  protected mergePropertiesIntoOne(name: string, arr: Array<Property>): Property{
    let newProps: number[] = []
    arr.forEach(property => {
      newProps = newProps.concat(property.value)
    });
    return new Property(name, newProps)
  }

  calculateSummaryProperty(components: Array<ComponentChemical>): Array<Property> {
    let allPropertiesNamesPresent = this.getAllPropertiesNames()
    //for each property name build a new property containing filtered properties
    let mergedProperties: Array<Property> = []
    allPropertiesNamesPresent.forEach(propertyName => {
      mergedProperties.push(this.mergePropertiesIntoOne(propertyName, this.filterPropertiesByName(propertyName)))
    });
    return mergedProperties
  }

  protected getAllPropertiesNames(): Array<string>{
    let result: string[] = []
    this.components.forEach(component => {
        component.properties.forEach(property => {
          result.push(property.name)
        });
    });
    return Array.from(new Set(result))
  }

  addNewComponents(component: Array<ComponentChemical>): void {
    this.components = this.components.concat(component)
    this.properties = this.calculateSummaryProperty(this.components)
  }
  modifyName(newString: string): void {
    this.name = newString
  }
  modifyDescription(newString: string): void {
    this.description = newString
  }
}
