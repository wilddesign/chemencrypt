export class PlausiblyDeniableChemicalEncryptionConfigs {
  isomerConfig: string;
  propertyConfig: string;
  numberOfCycles: number;
  propertiesInterfered: string[];
  constructor(isomerConfig: string, propertyConfig: string, numberOfCycles: number, propertiesList: string[]) {
    this.isomerConfig = isomerConfig;
    this.propertyConfig = propertyConfig;
    this.numberOfCycles = Math.floor(numberOfCycles);
    this.propertiesInterfered = propertiesList;
  }
}
