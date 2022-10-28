import boxen from 'npm:boxen@7.0.0';
import ciInfo from 'npm:ci-info@3.5.0';

type Ci = typeof ciInfo;
type Type = 'skip' | 'only';
type Tests = ReadonlyArray<Readonly<[() => void, ('only' | 'skip')?]>>;

const runTests = (tests: Tests) => tests.map(([test]) => test());

const mustRunAllTests = ({
    type,
    selectedTests,
}: Readonly<{
    type: Type;

    selectedTests: Tests;
}>) =>
    new Error(
        [
            '',
            `The following test${
                selectedTests.length === 1 ? '' : 's'
            } has "only" flagged`,
            boxen(selectedTests.map(([{ name }]) => name).join(`\n`), {
                padding: 1,
            }),
            `The "${type}" flag is not allowed in CI/CD environment`,
            '',
        ].join('\n')
    );

const handleSkipTests = ({
    ci,
    tests,
}: Readonly<{
    ci: Ci;
    tests: Tests;
}>) => {
    const selectedTests = tests.filter(([, only]) => only !== 'skip');
    if (!(ci.isCI && selectedTests.length)) {
        return runTests(selectedTests);
    }
    throw mustRunAllTests({
        type: 'skip',
        selectedTests,
    });
};

const handleOnlyTests = ({
    ci,
    tests,
}: Readonly<{
    ci: Ci;
    tests: Tests;
}>) => {
    const selectedTests = tests.filter(([, only]) => only === 'only');
    if (!(ci.isCI && selectedTests.length)) {
        return runTests(selectedTests);
    }
    throw mustRunAllTests({
        type: 'only',
        selectedTests,
    });
};

const parseCasesOfTestEnvValue = () => {
    switch (process.env.CASES_OF_TEST_IS_CI) {
        case undefined: {
            return undefined;
        }
        case 'true':
        case 'false': {
            return JSON.parse(process.env.CASES_OF_TEST_IS_CI);
        }
        default: {
            throw new Error(
                'CASES_OF_TEST cannot be any value other than boolean and undefined'
            );
        }
    }
};

const testCases = ({
    tests,
}: Readonly<{
    tests: ReadonlyArray<Readonly<[() => void, Type?]>>;
}>) => {
    const hasOnly = Boolean(tests.find(([, only]) => only === 'only'));
    const hasSkip = Boolean(tests.find(([, skip]) => skip === 'skip'));
    if (hasOnly && hasSkip) {
        throw new Error('Cannot have "only" and "skip" flag together');
    }

    const props = {
        tests,
        ci: {
            ...ciInfo,
            isCI: parseCasesOfTestEnvValue() ?? ciInfo.isCI,
        } as Ci,
    };

    if (hasOnly) {
        return handleOnlyTests(props);
    }

    if (hasSkip) {
        return handleSkipTests(props);
    }

    return runTests(tests);
};

export default testCases;
