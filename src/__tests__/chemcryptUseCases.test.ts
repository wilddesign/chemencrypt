import { MixtureOfChemicals } from '../mixtureOfChemicals';
import { Chemical } from '../chemical';
import { Config } from '../config';
import { PlausiblyDeniableChemicalEncryptionConfigs } from '../plausiblyDeniableChemicalEncryptionConfigs';
import { BasicSearches } from '../basicSearches';
import { BasicSelects } from '../basicSelects';
import { BasicCalculations } from '../basicCalculations';
import { Property } from '../property';
import { ComponentChemical } from '../componentChemical';
import { PlausiblyDeniableChemicalEncryption } from '../plausiblyDeniableChemicalEncryption';

const fs = require('fs');

test('Integration test 1', () => {
  //testing with fake data
  const props1 = [new Property('cnmr', [50, 100, 150]), new Property('uvvis', 400), new Property('mass', 131)];
  const chemical1 = new Chemical('salicylic acid', 'C10H6N4O2', props1);

  const props2 = [new Property('cnmr', [50, 90, 150, 120]), new Property('uvvis', 300), new Property('mass', 131)];
  const chemical2 = new Chemical('methylresorcine', 'C10H6N4O2', props2);

  const props3 = [new Property('cnmr', [101, 155]), new Property('uvvis', 410), new Property('mass', 151)];
  const chemical3 = new Chemical('ethylbenzoic acid', 'C12H8N4O2', props3);

  const chemicalsDB = [chemical1, chemical2, chemical3];

  const encrp = [new Property('cnmr', [105, 180, 30]), new Property('uvvis', 405), new Property('mass', 121)];
  const encrc = new Chemical('nosylic acid', 'C12H8N4O2', encrp);

  expect(BasicSearches.findIsomers(encrc, chemicalsDB).length).toEqual(1);

  const uvvisConfig = new Config(20, 'uvvis');

  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[1], chemicalsDB, uvvisConfig).length).toEqual(
    2,
  );

  const cnmrConfig = new Config(5, 'cnmr');

  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0], chemicalsDB, cnmrConfig).length).toEqual(2);
  expect(
    BasicSelects.selectAll(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0], chemicalsDB, cnmrConfig))
      .length,
  ).toEqual(2);
  const toBeSelected = BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0], chemicalsDB, cnmrConfig);
  expect(BasicSelects.selectOneRandomly(toBeSelected).length).toEqual(1);
});

test('Integration test 2', () => {
  const props1 = [new Property('cnmr', [50, 100, 150]), new Property('uvvis', 399), new Property('mass', 131)];
  const chemical1 = new Chemical('salicylic acid', 'C10H6N4O2', props1);

  const props2 = [new Property('cnmr', [50, 90, 150, 120]), new Property('uvvis', 300), new Property('mass', 131)];
  const chemical2 = new Chemical('methylresorcine', 'C10H6N4O2', props2);

  const props3 = [new Property('cnmr', [101, 155]), new Property('uvvis', 410), new Property('mass', 151)];
  const chemical3 = new Chemical('ethylbenzoic acid', 'C12H8N4O2', props3);

  const chemicalsDB = [chemical1, chemical2, chemical3];

  const encrp = [new Property('cnmr', [105, 180, 30]), new Property('uvvis', 405), new Property('mass', 121)];
  const encrc = new Chemical('nosylic acid', 'C12H8N4O2', encrp);
  const encrco = new ComponentChemical(encrc, 1);
  const encrm = new MixtureOfChemicals('mixture 1', 'test mixture', [encrco]);

  const uvvisConfig = new Config(2, 'uvvis');
  const cnmrConfig = new Config(1, 'cnmr');
  const cConfig = new Config(50, 'conductivity');
  const interferentSearchConfigs = [uvvisConfig, cnmrConfig, cConfig];
  const encryptConfigs = new PlausiblyDeniableChemicalEncryptionConfigs(
    'all',
    'all',
    1,
    interferentSearchConfigs.map((conf) => {
      return conf.propertyName;
    }),
  );

  expect(encryptConfigs).toBeDefined();
  const encryption1 = new PlausiblyDeniableChemicalEncryption(
    encrm,
    [encrc],
    chemicalsDB,
    interferentSearchConfigs,
    encryptConfigs,
  );
  expect(encryption1).toBeDefined();
  encryption1.encrypt();

  console.log(encryption1.returnEncryptedMixture())
  console.log(encryption1.returnEncryptedMixture().properties)
  console.log(encryption1.returnEncryptedMixtureChemicalsList())
});
