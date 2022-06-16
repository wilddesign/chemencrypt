
import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from '../index';


//console.log('Testing classes relevant to the problem')

test('Property object is generated with string, number or arrays string[] or number[]', () => {
  expect(new Property('x',123.)).toEqual({
    name: 'x',
    value: [123.]
  });
  expect(new Property('x',[1,2])).toEqual({
    name: 'x',
    value: [1,2]
  });
});


test('Chemical object is generated with properties', () => {
  let props = [new Property('x',2), new Property('y',1.)]
  expect(new Chemical('x','abc', props)).toEqual({
    name: 'x',
    formula: 'abc',
    properties: [{
      name: 'x',
      value: [2]
    },{
      name: 'y',
      value: [1.]
    }]
  });
});

test('Error when a Chemical object is generated with duplicate properties', () => {
  let props = [new Property('x',8), new Property('x',1.)]
  expect(() => {let a = new Chemical('x','abc', props)}).toThrow('Duplicate property name!');
});

test('Chemical component object is generated with a quantity', () => {
  let props = [new Property('x',8), new Property('y',1.)]
  let chemical = new Chemical('x','abc', props)
  expect(new ComponentChemical(chemical, 0.5)).toEqual({
    name: 'x',
    formula: 'abc',
    quantity: 0.5,
    properties: [{
      name: 'x',
      value: [8]
    },{
      name: 'y',
      value: [1.]
    }]
  });
});

test('MixtureOfChemicals object is generated correctly', () => {
  let props1 = [new Property('x',2), new Property('y',1.)]
  let chemical1 = new Chemical('x','abc', props1)

  let props2 = [new Property('y',23), new Property('b',67)]
  let chemical2 = new Chemical('x','abc', props2)

  let components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)]

  expect(new MixtureOfChemicals('test', 'test mixture', components)).toEqual({
    name: 'test',
    description: 'test mixture',
    components:[
      {
      name: 'x',
      formula: 'abc',
      quantity: 1,
      properties: [{
        name: 'x',
        value: [2]
      },{
        name: 'y',
        value: [1.]
      }]
    },{
    name: 'x',
    formula: 'abc',
    quantity: 0.3,
    properties: [{
      name: 'y',
      value: [23]
    },{
      name: 'b',
      value: [67]
    }]
  }
    ]
  });
});
