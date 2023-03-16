import { describe, expect, test, expectTypeOf, it } from 'vitest';
import { getDateRange } from '../../../src/utils/date';
describe('Test getDateRange function', () => {
    const date = new Date('2023-01-03 08:00:00');
    const before = getDateRange(date, 3, true);
    const after = getDateRange(date, 3, false);
    it('Take a UTC time range snapshot three days ago', () => {
        expect(before).toMatchInlineSnapshot(`
      [
        2022-12-30T16:00:00.000Z,
        2023-01-02T16:00:00.000Z,
      ]
    `);
    });
    it('Take a UTC time range snapshot after three days', () => {
        expect(after).toMatchInlineSnapshot(`
      [
        2023-01-02T16:00:00.000Z,
        2023-01-05T16:00:00.000Z,
      ]
    `);
    });
    test('check return type', () => {
        expectTypeOf(before).toBeArray();
        expectTypeOf(after).toBeArray();
    });
});
