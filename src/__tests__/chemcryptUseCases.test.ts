
import {Calculator, Config, BasicCalculations, BasicSearches} from '../calculations';
import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from '../index';


//console.log('Testing use cases in integration tests')
/*
let props1 = [new Property('x','abc'), new Property('y',1.)]
let chemical1 = new Chemical('x','abc', props1)

let props2 = [new Property('y','abcd'), new Property('b','aa')]
let chemical2 = new Chemical('x','abc', props2)
build a database of a few chemicals
create a chemical of interest Object

search for similars in the database
search for isomers

test('Config object is created', () => {
  expect(new Config(1.)).toEqual({
    epsilon: 1.
  });
});



test('BasicCalculations object performs correctly', () => {
  expect(BasicCalculations.isMatchByNumber(0,10,2)).toEqual(false);
  expect(BasicCalculations.isMatchByNumber(0,10,20)).toEqual(true);
  expect(BasicCalculations.isEqual('a','a')).toEqual(true);
  expect(BasicCalculations.isEqual('a','b')).toEqual(false);
});
*/

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
  let uvvisConfig = new Config(20)
  //console.log(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[1],chemicalsDB,uvvisConfig))
  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[1],chemicalsDB,uvvisConfig).length).toEqual(2);
  //let components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)]
  //console.log('find similars by cnmr with multiple signals')
  let cnmrConfig = new Config(5)
  //console.log(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig))
  expect(BasicSearches.findAllChemicalsByPropCondition(encrc.properties[0],chemicalsDB,cnmrConfig).length).toEqual(2);

  /*expect(new MixtureOfChemicals('test', 'test mixture', components)).toEqual({
    name: 'test',
    description: 'test mixture',
    components:[
      {
      name: 'x',
      formula: 'abc',
      quantity: 1,
      properties: [{
        name: 'x',
        value: 'abc'
      },{
        name: 'y',
        value: 1.
      }]
    },{
    name: 'x',
    formula: 'abc',
    quantity: 0.3,
    properties: [{
      name: 'y',
      value: 'abcd'
    },{
      name: 'b',
      value: 'aa'
    }]
  }
    ]
  });*/
});
