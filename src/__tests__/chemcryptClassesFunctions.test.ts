import { Chemical } from '../chemical';
import { Property } from '../property';
import { ComponentChemical } from '../componentChemical';

test('Chemical object property getting', () => {
  const props = [new Property('x', 2), new Property('y', 1)];
  const chemical = new Chemical('x', 'abc', props);
  expect(chemical.exposePropertyValueByName('y')).toEqual([1]);
});

test('Chemical Component object property getting', () => {
  const props = [new Property('x', 2), new Property('y', 1)];
  const chemical = new Chemical('x', 'abc', props);
  const component = new ComponentChemical(chemical, 0.5);
  expect(component.exposePropertyValueByName('y')).toEqual([1]);
});
