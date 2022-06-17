
import {Config, BasicCalculations} from '../calculations';


//console.log('Testing Calculator functions')

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
