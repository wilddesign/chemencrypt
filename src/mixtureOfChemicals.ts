import { ComponentChemical } from './componentChemical';
import { Property } from './property';

export class MixtureOfChemicals {
  name: string;
  description: string;
  components: ComponentChemical[];
  properties: Property[];
  constructor(name: string, description: string, components: ComponentChemical[]) {
    // throw error when somebody tries to create it using components Array
    // with duplicate names
    this.checkForDuplicates(components);
    this.name = name;
    this.description = description;
    this.components = components;
    this.properties = this.calculateSummaryProperty(this.components);
  }

  protected checkForDuplicates(arr: ComponentChemical[]) {
    const names: string[] = [];
    arr.forEach((component) => {
      names.push(component.name);
    });
    if (names.length !== Array.from(new Set(names)).length) {
      throw new Error('Error trying to build MixtureOfChemicals with components array containing duplicates!');
    } else {
      return;
    }
  }

  protected mergeAllComponentPropertiesIntoOne(): Property[] {
    let result: Property[] = [];
    this.components.forEach((component) => {
      result = result.concat(component.properties);
    });
    return result;
  }

  protected filterPropertiesByName(name: string): Property[] {
    const allProperties = this.mergeAllComponentPropertiesIntoOne();
    return allProperties.filter((property) => {
      return property.name === name;
    });
  }

  protected mergePropertiesIntoOne(name: string, arr: Property[]): Property {
    let newProps: number[] = [];
    arr.forEach((property) => {
      newProps = newProps.concat(property.value);
    });
    return new Property(name, newProps);
  }

  calculateSummaryProperty(components: ComponentChemical[]): Property[] {
    const allPropertiesNamesPresent = this.getAllPropertiesNames();
    const mergedProperties: Property[] = [];
    allPropertiesNamesPresent.forEach((propertyName) => {
      mergedProperties.push(this.mergePropertiesIntoOne(propertyName, this.filterPropertiesByName(propertyName)));
    });
    return mergedProperties;
  }

  protected getAllPropertiesNames(): string[] {
    const result: string[] = [];
    this.components.forEach((component) => {
      component.properties.forEach((property) => {
        result.push(property.name);
      });
    });
    return Array.from(new Set(result));
  }

  addNewComponents(component: ComponentChemical[]): void {
    this.components = this.components.concat(component);
    this.properties = this.calculateSummaryProperty(this.components);
  }
  modifyName(newString: string): void {
    this.name = newString;
  }
  modifyDescription(newString: string): void {
    this.description = newString;
  }
}
