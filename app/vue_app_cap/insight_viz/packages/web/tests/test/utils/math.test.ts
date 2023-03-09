import { describe, expect, test, expectTypeOf } from 'vitest';
import { randomHexColor, randomHexColorList, getX, randomNum, variance } from '../../../src/utils/math';

describe('Test randomHexColor', () => {
  const color = randomHexColor();
  test('测试randomHexColor函数的返回值是否是string类型', () => {
    expect(color).toBeTypeOf('string');
  });
  test('测试生成的随机颜色字符串的的长度是否为7', () => {
    expect(color).toHaveLength(7);
  });
  test('测试生成的随机颜色字符串都是正确的16进制颜色', () => {
    expect(color).toMatch(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/);
  });
});

describe('Test randomHexColorList', () => {
  const len = 3;
  const colorList = randomHexColorList(len);
  test('测试生成的随机颜色数组长度是否与输入长度相等', () => {
    expect(colorList).toHaveLength(len);
  });
});

describe('Test getX', () => {
  const resDataByEmptyArray = {
    avg: 0,
    std: 0
  };
  test('The return value is not undefined', () => {
    expect(getX([])).toBeDefined();
  });
  test('The return value have the same properties', () => {
    expect(getX([])).toEqual(resDataByEmptyArray);
  });
});

describe('Test randomNum function', () => {
  const minNum = 0;
  const maxNum = 100;
  const value = randomNum(minNum, maxNum);
  test('check return type', () => {
    expectTypeOf(value).toBeNumber();
  });
  test('The return value is between 1 and 100', () => {
    expect(value).toBeGreaterThan(minNum);
    expect(value).toBeLessThan(maxNum);
  });
});

describe('Test variance function', () => {
  const data = [1, 3, 4, 4];
  const value = variance(data);
  test('check return type', () => {
    expectTypeOf(value).toBeNumber();
  });
});
