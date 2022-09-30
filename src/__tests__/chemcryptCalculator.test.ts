import { Config } from '../config';
import { Chemical } from '../chemical';
import { BasicCalculations } from '../basicCalculations';

test('Config object is created', () => {
  expect(new Config(1, 'x')).toEqual({
    epsilon: 1,
    propertyName: 'x',
  });
});

test('BasicCalculations object performs correctly', () => {
  expect(BasicCalculations.isMatchByNumber(0, 10, 2)).toEqual(false);
  expect(BasicCalculations.isMatchByNumber(0, 10, 20)).toEqual(true);
  expect(BasicCalculations.isEqual('a', 'a')).toEqual(true);
  expect(BasicCalculations.isEqual('a', 'b')).toEqual(false);
});
