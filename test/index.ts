import testCases from '../src';
import {
    testContainsNone,
    testContainsOnlyFlagToExecute,
    testContainsSkipFlagToExecute,
    testContainsOnlyFlagToThrowError,
    testContainsSkipFlagToThrowError,
} from './contains';

testCases({
    tests: [
        [testContainsNone],
        [testContainsOnlyFlagToExecute],
        [testContainsSkipFlagToExecute],
        [testContainsOnlyFlagToThrowError],
        [testContainsSkipFlagToThrowError],
    ],
});
