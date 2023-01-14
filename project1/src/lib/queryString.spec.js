import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Weslley',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Weslley&profession=developer');
  });

  it('should create a valid query string even when an array is passed in value', () => {
    const obj = {
      name: 'Weslley',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Weslley&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Weslley',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should covert a query string to object', () => {
    const qs = 'name=Weslley&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Weslley',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair', () => {
    const qs = 'name=Weslley';
    expect(parse(qs)).toEqual({
      name: 'Weslley',
    });
  });

  it('should convert a query string to an object taking care of comma separate values', () => {
    const qs = 'name=Weslley&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Weslley',
      abilities: ['JS', 'TDD'],
    });
  });
});
