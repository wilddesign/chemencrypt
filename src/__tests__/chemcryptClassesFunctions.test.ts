
import {Property, Chemical, ComponentChemical} from '../index';


//console.log('Testing classes functions')

test('Chemical object property getting', () => {
  let props = [new Property('x',2), new Property('y',1.)]
  let chemical = new Chemical('x','abc', props);
  expect(chemical.exposePropertyValueByName('y')).toEqual([1.]);
});

test('Chemical Component object property getting', () => {
  let props = [new Property('x',2), new Property('y',1.)]
  let chemical = new Chemical('x','abc', props);
  let component = new ComponentChemical(chemical, 0.5)
  expect(component.exposePropertyValueByName('y')).toEqual([1.]);
});
