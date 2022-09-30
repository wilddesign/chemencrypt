import { MixtureOfChemicals } from '../mixtureOfChemicals';
import { Chemical } from '../chemical';
import { Property } from '../property';
import { ComponentChemical } from '../componentChemical';

test('Property object is generated with string, number or arrays string[] or number[]', () => {
  expect(new Property('x', 123)).toEqual({
    name: 'x',
    value: [123],
  });
  expect(new Property('x', [1, 2])).toEqual({
    name: 'x',
    value: [1, 2],
  });
});

test('Chemical object is generated with properties', () => {
  let props = [new Property('x', 2), new Property('y', 1)];
  expect(new Chemical('x', 'abc', props)).toEqual({
    name: 'x',
    formula: 'abc',
    properties: [
      {
        name: 'x',
        value: [2],
      },
      {
        name: 'y',
        value: [1],
      },
    ],
  });
});

test('Error when a Chemical object is generated with duplicate properties', () => {
  const props = [new Property('x', 8), new Property('x', 1)];
  expect(() => {
    const a = new Chemical('x', 'abc', props);
  }).toThrow('Duplicate property name!');
});

test('Chemical component object is generated with a quantity', () => {
  const props = [new Property('x', 8), new Property('y', 1)];
  const chemical = new Chemical('x', 'abc', props);
  expect(new ComponentChemical(chemical, 0.5)).toEqual({
    name: 'x',
    formula: 'abc',
    quantity: 0.5,
    properties: [
      {
        name: 'x',
        value: [8],
      },
      {
        name: 'y',
        value: [1],
      },
    ],
  });
});

test('MixtureOfChemicals object is generated correctly', () => {
  const props1 = [new Property('x', 2), new Property('y', 1)];
  const chemical1 = new Chemical('x', 'abc', props1);

  const props2 = [new Property('y', 23), new Property('b', 67)];
  const chemical2 = new Chemical('xx', 'abc', props2);

  const components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)];

  expect(new MixtureOfChemicals('test', 'test mixture', components)).toEqual({
    name: 'test',
    description: 'test mixture',
    properties: [
      {
        name: 'x',
        value: [2],
      },
      {
        name: 'y',
        value: [1, 23],
      },
      {
        name: 'b',
        value: [67],
      },
    ],
    components: [
      {
        name: 'x',
        formula: 'abc',
        quantity: 1,
        properties: [
          {
            name: 'x',
            value: [2],
          },
          {
            name: 'y',
            value: [1],
          },
        ],
      },
      {
        name: 'xx',
        formula: 'abc',
        quantity: 0.3,
        properties: [
          {
            name: 'y',
            value: [23],
          },
          {
            name: 'b',
            value: [67],
          },
        ],
      },
    ],
  });
});

test('MixtureOfChemicals object functions correctly', () => {
  const props1 = [new Property('x', 2), new Property('y', 1)];
  const chemical1 = new Chemical('x', 'abc', props1);

  const props2 = [new Property('y', 23), new Property('b', 67)];
  const chemical2 = new Chemical('xx', 'abc', props2);

  const components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)];
  const mixture = new MixtureOfChemicals('test', 'test mixture', components);
  mixture.modifyName('new test');
  mixture.modifyDescription('new description');
  expect([mixture.name, mixture.description]).toEqual(['new test', 'new description']);
});

test('MixtureOfChemicals object returns error with duplicates in input', () => {
  const props1 = [new Property('x', 2), new Property('y', 1)];
  const chemical1 = new Chemical('x', 'abc', props1);

  const props2 = [new Property('y', 23), new Property('b', 67)];
  const chemical2 = new Chemical('x', 'abc', props2);

  const components = [
    new ComponentChemical(chemical1, 1),
    new ComponentChemical(chemical2, 0.3),
    new ComponentChemical(chemical2, 0.6),
  ];

  expect(() => {
    const mixture = new MixtureOfChemicals('test', 'test mixture', components);
  }).toThrow('Error trying to build MixtureOfChemicals with components array containing duplicates!');
});

test('MixtureOfChemicals object adds new components', () => {
  const props1 = [new Property('x', 2), new Property('y', 1)];
  const chemical1 = new Chemical('x', 'abc', props1);

  const props2 = [new Property('y', 23), new Property('b', 67)];
  const chemical2 = new Chemical('xx', 'abc', props2);

  const components = [new ComponentChemical(chemical1, 1), new ComponentChemical(chemical2, 0.3)];
  const mixture = new MixtureOfChemicals('test', 'test mixture', components);

  const chemical3 = new Chemical('x2', 'abc', [new Property('x', 21), new Property('y', 11)]);
  const chemical4 = new Chemical('x22', 'abc', [new Property('y', 231), new Property('b', 671)]);
  const components2 = [new ComponentChemical(chemical3, 1), new ComponentChemical(chemical4, 0.3)];

  mixture.addNewComponents(components2);

  expect(mixture).toEqual({
    name: 'test',
    description: 'test mixture',
    properties: [
      {
        name: 'x',
        value: [2, 21],
      },
      {
        name: 'y',
        value: [1, 11, 23, 231],
      },
      {
        name: 'b',
        value: [67, 671],
      },
    ],
    components: [
      {
        name: 'x',
        formula: 'abc',
        quantity: 1,
        properties: [
          {
            name: 'x',
            value: [2],
          },
          {
            name: 'y',
            value: [1],
          },
        ],
      },
      {
        name: 'xx',
        formula: 'abc',
        quantity: 0.3,
        properties: [
          {
            name: 'y',
            value: [23],
          },
          {
            name: 'b',
            value: [67],
          },
        ],
      },
      {
        name: 'x2',
        formula: 'abc',
        quantity: 1,
        properties: [
          {
            name: 'x',
            value: [21],
          },
          {
            name: 'y',
            value: [11],
          },
        ],
      },
      {
        name: 'x22',
        formula: 'abc',
        quantity: 0.3,
        properties: [
          {
            name: 'y',
            value: [231],
          },
          {
            name: 'b',
            value: [671],
          },
        ],
      },
    ],
  });
});
