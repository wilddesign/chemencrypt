import { Chemical } from './chemical';

export class ComponentChemical extends Chemical {
  quantity: number;
  constructor(chemical: Chemical, qty: number) {
    super(chemical.name, chemical.formula, chemical.properties);
    this.quantity = qty;
  }
}
