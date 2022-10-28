import testCases from '../../src';
import { it, describe, expect } from 'vitest';

const testContainsFlagToThrowError = () =>
    describe.each(['only', 'skip'] as const)(
        `tests with flag configured`,
        (type) => {
            it(`should throw error when it detects there is "${type}" configured to at least one test`, () => {
                (process.env.CASES_OF_TEST_IS_CI as any) = 'true';
                const numberOfTests = 10;
                expect(() =>
                    testCases({
                        tests: Array.from(
                            { length: numberOfTests },
                            (_, index) => [() => {}, index ? type : undefined]
                        ),
                    })
                ).toThrowError();
            });
        }
    );

const testContainsFlagToExecute = () =>
    describe.each(['only', 'skip'] as const)(
        `tests with flag configured`,
        (type) => {
            it(`should run tests when it detects there is "${type}" configured to at least one test`, () => {
                (process.env.CASES_OF_TEST_IS_CI as any) = 'false';
                const numberOfTests = 10;
                const testsRan = testCases({
                    tests: Array.from({ length: numberOfTests }, (_, index) => [
                        () => {},
                        index ? type : undefined,
                    ]),
                });
                expect(testsRan).toStrictEqual(
                    type === 'skip'
                        ? [undefined]
                        : Array.from(
                              { length: numberOfTests - 1 },
                              () => undefined
                          )
                );
            });
        }
    );

export { testContainsFlagToExecute, testContainsFlagToThrowError };
