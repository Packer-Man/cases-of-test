import testCases from '../../src';
import { it, describe, expect } from 'vitest';

const testWithoutOnly = () => {
    describe('without passing "only" to tests', () => {
        it('should not throw error before running any tests', () => {
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

export default testWithoutOnly;
