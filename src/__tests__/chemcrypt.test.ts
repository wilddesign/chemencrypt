
import {Property, Chemical, ComponentChemical, MixtureOfChemicals} from '../index';


console.log('Testing classes relevant to the problem')

test('Property object is generated with string, number or arrays string[] or number[]', () => {
  expect(new Property('x','abc')).toEqual({
    name: 'x',
    value: 'abc'
  });
  expect(new Property('x',123.)).toEqual({
    name: 'x',
    value: 123.
  });
  expect(new Property('x',['abc','abc'])).toEqual({
    name: 'x',
    value: ['abc','abc']
  });
  expect(new Property('x',[1,2])).toEqual({
    name: 'x',
    value: [1,2]
  });
});


test('Chemical object is generated with properties', () => {
  let props = [new Property('x','abc'), new Property('x',1.)]
  expect(new Chemical('x','abc', props)).toEqual({
    name: 'x',
    formula: 'abc',
    properties: [{
      name: 'x',
      value: 'abc'
    },{
      name: 'x',
      value: 1.
    }]
  });
});

test('Chemical component object is generated with a quantity', () => {
  let props = [new Property('x','abc'), new Property('x',1.)]
  let chemical = new Chemical('x','abc', props)
  expect(new ComponentChemical(chemical, 0.5)).toEqual({
    name: 'x',
    formula: 'abc',
    quantity: 0.5,
    properties: [{
      name: 'x',
      value: 'abc'
    },{
      name: 'x',
      value: 1.
    }]
  });
});

test('MixtureOfChemicals object is generated correctly', () => {
  let props1 = [new Property('x','abc'), new Property('x',1.)]
  let chemical1 = new Chemical('x','abc', props1)

  let props2 = [new Property('y','abcd'), new Property('b','aa')]
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
        value: 'abc'
      },{
        name: 'x',
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
  });
});
