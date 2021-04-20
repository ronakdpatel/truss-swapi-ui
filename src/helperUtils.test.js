import {
  formatNumber,
  getSortedDirectionClass,
  ignoreCaseStringCompare,
  numberCompare,
  isUnknown,
  calculateWaterSurfaceArea
} from './helperUtils';

test('Formats digits', () => {
  expect(formatNumber(10000)).toBe('10 000');
  expect(formatNumber(100000)).toBe('100 000');
  expect(formatNumber(999)).toBe('999');
  expect(formatNumber(9)).toBe('9');
  expect(formatNumber(5555555)).toBe('5 555 555');
});

test('Check if string is unknown', () => {
  expect(isUnknown('unknown')).toBe(true);
  expect(isUnknown('Unknown')).toBe(false);
  expect(isUnknown(null)).toBe(false);
  expect(isUnknown(undefined)).toBe(false);
  expect(isUnknown(0)).toBe(false);
});

test('Sort strings ascending', () => {
  let input = ['alpha', 'Zebra', 'AAA', 'beta', 'cat', '', 'unknown'];
  let output = ['', 'AAA', 'alpha', 'beta', 'cat', 'Zebra', 'unknown'];
  expect(input.sort(ignoreCaseStringCompare)).toStrictEqual(output);

  input = ['unknown', 'AAA', 'aaaa', 'Unknown', 'zebra', 'cat', '', 'unknown'];
  output = ['', 'AAA', 'aaaa', 'cat', 'Unknown', 'zebra', 'unknown', 'unknown'];
  expect(input.sort(ignoreCaseStringCompare)).toStrictEqual(output);
});

test('Sort numbers ascending', () => {
  let input = ['unknown', 5, 1000, 999, 9999, 5555];
  let output = [5, 999, 1000, 5555, 9999, 'unknown'];
  expect(input.sort(numberCompare)).toStrictEqual(output);

  input = ['unknown', 'unknown', 1, 11, 111, 5555];
  output = [1, 11, 111, 5555, 'unknown', 'unknown'];
  expect(input.sort(numberCompare)).toStrictEqual(output);
});

test('Determine sorted classes', () => {
  expect(getSortedDirectionClass('name', 'name', 'asc')).toBe('sortable sorted-asc');
  expect(getSortedDirectionClass('name', 'name', 'desc')).toBe('sortable sorted-desc');
  expect(getSortedDirectionClass('name', 'residents', 'asc')).toBe('sortable');
  expect(getSortedDirectionClass('name', 'residents', 'desc')).toBe('sortable');
});

test('Calculates water surface area', () => {
  expect(calculateWaterSurfaceArea(7549, 60)).toBe(107418720);
  expect(calculateWaterSurfaceArea(12780, 5)).toBe(25655565);
  expect(calculateWaterSurfaceArea(10465, 100)).toBe(344055368);
  expect(calculateWaterSurfaceArea(0, 60)).toBe(0);
  expect(calculateWaterSurfaceArea(0, 'unknown')).toBe('unknown');
  expect(calculateWaterSurfaceArea('unknown', 10)).toBe('unknown');
});
