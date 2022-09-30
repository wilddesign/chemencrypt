import { Property } from './property';

interface ExposePropertyValueByName {
  exposePropertyValueByName(name: string): number[];
}

export class Chemical implements ExposePropertyValueByName {
  name: string;
  formula: string;
  properties: Property[];

  constructor(name: string, formula: string, props: Property[]) {
    this.name = name;
    this.formula = formula;
    // check if duplicate props
    if (props.length !== new Set(props.map((prop) => prop.name)).size) {
      throw new Error('Duplicate property name!');
    }
    this.properties = props;
  }

  exposePropertyValueByName(name: string) {
    const filtered = this.properties.filter((property) => property.name === name);
    if (filtered.length > 1) {
      throw new Error('Duplicate property name!');
    }
    return filtered[0].value;
  }
}
