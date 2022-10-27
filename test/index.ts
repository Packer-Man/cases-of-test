import testCases from '../src';
import {
    testContainsNone,
    testContainsFlagToExecute,
    testContainsFlagToThrowError,
} from './contains';

testCases({
    tests: [
        [testContainsNone],
        [testContainsFlagToExecute],
        [testContainsFlagToThrowError],
    ],
});
