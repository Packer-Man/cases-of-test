import testCases from '../../src';
import { it, describe, expect } from 'vitest';

const testContainsOnly = () => {
    describe('tests with "only" configured', () => {
        it('should throw error when it detects there is "only" configured to at least one test', () => {
            const numberOfTests = 10;
            const exec = () =>
                testCases({
                    tests: Array.from({ length: numberOfTests }, (_, index) => [
                        () => {},
                        !index ? undefined : 'only',
                    ]),
                });
            expect(exec).toThrowError();
        });
    });
};

export default testContainsOnly;
