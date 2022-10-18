import testCases from '../src';
import testContainsOnly from './contains-only';
import testWithoutOnly from './without-only';

testCases({
    tests: [[testWithoutOnly], [testContainsOnly]],
});
