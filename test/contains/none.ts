import testCases from '../../src';
import { it, describe, expect } from 'vitest';

const testContainsNone = () => {
    describe('without passing "only" or "skip" to tests', () => {
        it('should run test and not throw error before running any tests', () => {
            const numberOfTests = 10;
            const testsRan = testCases({
                tests: Array.from({ length: numberOfTests }, () => [() => {}]),
            });
            expect(testsRan).toStrictEqual(
                Array.from({ length: numberOfTests }, () => undefined)
            );
        });
    });
};

export { testContainsNone };
