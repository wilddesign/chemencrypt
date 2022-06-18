
import {Config, BasicCalculations, BasicSearches, BasicSelects} from '../calculations';
import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from '../index';
import {PlausiblyDeniableChemicalEncryption, PlausiblyDeniableChemicalEncryptionConfigs} from '../encryption'

test('Integration test 1', () => {
  let props1 = [new Property('cnmr',[50,100,150]), new Property('uvvis',400), new Property('mass',131)]
  let chemical1 = new Chemical('salicylic acid','C10H6N4O2', props1)

  let props2 = [new Property('cnmr',[50,90,150,120]), new Property('uvvis',300), new Property('mass',131)]
  let chemical2 = new Chemical('methylresorcine','C10H6N4O2', props2)

  let props3 = [new Property('cnmr',[101,155]), new Property('uvvis',410), new Property('mass',151)]
  let chemical3 = new Chemical('ethylbenzoic acid','C12H8N4O2', props3)

  let chemicalsDB = [chemical1, chemical2, chemical3]


  let encrp = [new Property('cnmr',[105,180,30]), new Property('uvvis',405), new Property('mass',121)]
  let encrc = new Chemical('nosylic acid','C12H8N4O2', encrp)
  //console.log('find isomers')
  //console.log(BasicSearches.findIsomers(encrc,chemicalsDB))
  expect(BasicSearches.findIsomers(encrc,chemicalsDB).length).toEqual(1);

  //console.log('find similars by uvvis')
  let uvvisConfig = new Config(20,'uvvis')
  //console.log(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[1],chemicalsDB,uvvisConfig))
  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[1],chemicalsDB,uvvisConfig).length).toEqual(2);
  //let components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)]
  //console.log('find similars by cnmr with multiple signals')
  let cnmrConfig = new Config(5,'cnmr')
  //console.log(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig))
  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig).length).toEqual(2);
  expect(BasicSelects.selectAll(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig)).length).toEqual(2);
  let toBeSelected = BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig)
  expect(BasicSelects.selectOneRandomly(toBeSelected).length).toEqual(1);
  //console.log(BasicSelects.selectOneRandomly(toBeSelected))
});

test('Integration test 2', () => {
  let props1 = [new Property('cnmr',[50,100,150]), new Property('uvvis',400), new Property('mass',131)]
  let chemical1 = new Chemical('salicylic acid','C10H6N4O2', props1)

  let props2 = [new Property('cnmr',[50,90,150,120]), new Property('uvvis',300), new Property('mass',131)]
  let chemical2 = new Chemical('methylresorcine','C10H6N4O2', props2)

  let props3 = [new Property('cnmr',[101,155]), new Property('uvvis',410), new Property('mass',151)]
  let chemical3 = new Chemical('ethylbenzoic acid','C12H8N4O2', props3)

  let chemicalsDB = [chemical1, chemical2, chemical3]


  let encrp = [new Property('cnmr',[105,180,30]), new Property('uvvis',405), new Property('mass',121)]
  let encrc = new Chemical('nosylic acid','C12H8N4O2', encrp)
  let encrco = new ComponentChemical(encrc, 1)
  let encrm = new MixtureOfChemicals('mixture 1', 'test mixture', [encrco])
  // now we have tools for the selection of interferents, thus we can build
  // encrypted mixtures containing encrm
  // this accepts the input chemical, list of available interferents and encryption
  // configs
  let uvvisConfig = new Config(20,'uvvis')
  let cnmrConfig = new Config(5,'cnmr')
  let encryptConfigs = new PlausiblyDeniableChemicalEncryptionConfigs('single','single', 1,['cnmr','uvvis'])
  expect(encryptConfigs).toBeDefined()
  let encryption1 = new PlausiblyDeniableChemicalEncryption(encrm, encrc, chemicalsDB,[uvvisConfig,cnmrConfig], encryptConfigs)
  expect(encryption1).toBeDefined()
  encryption1.encrypt()
  console.log(encryption1.returnEncryptedMixture())
  console.log(encryption1.returnEncryptedMixture().properties)
  // it moves chemicals from available to input, assigning random quantity.
  // interferent choice is controlled via configs
});
