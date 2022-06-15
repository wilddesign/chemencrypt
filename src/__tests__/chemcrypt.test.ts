
import {Property, Chemical, ComponentChemical/*, EncryptedMixtureOfChemicals*/} from '../index';


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
