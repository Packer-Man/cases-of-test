import testCases, { Type } from '../../src';
import { it, describe, expect } from 'vitest';

const testContainsFlagToThrowError = (type: Type) =>
    describe(`tests with "${type}" configured`, () => {
        it(`should throw error when it detects there is "${type}" configured to at least one test`, () => {
            (process.env.TESTS_CASES_IS_CI as any) = true;
            const numberOfTests = 10;
            const exec = () =>
                testCases({
                    tests: Array.from({ length: numberOfTests }, (_, index) => [
                        () => {},
                        index ? type : undefined,
                    ]),
                });
            expect(exec).toThrowError();
        });
    });

const testContainsFlagToExecute = (type: Type) =>
    describe(`tests with "${type}" configured`, () => {
        it(`should run tests when it detects there is "${type}" configured to at least one test`, () => {
            const numberOfTests = 10;
            const testsRan = testCases({
                tests: Array.from({ length: numberOfTests }, (_, index) => [
                    () => {},
                    index ? type : undefined,
                ]),
            });
            expect(testsRan).toStrictEqual([undefined]);
        });
    });

const testContainsSkipFlagToThrowError = () =>
    testContainsFlagToThrowError('skip');

const testContainsOnlyFlagToThrowError = () =>
    testContainsFlagToThrowError('only');

const testContainsSkipFlagToExecute = () => testContainsFlagToExecute('skip');

const testContainsOnlyFlagToExecute = () => testContainsFlagToExecute('only');

export {
    testContainsSkipFlagToExecute,
    testContainsOnlyFlagToExecute,
    testContainsSkipFlagToThrowError,
    testContainsOnlyFlagToThrowError,
};
