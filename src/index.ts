import boxen from 'boxen';
import ciInfo from 'ci-info';

const testCases = ({
    tests,
}: Readonly<{
    tests: ReadonlyArray<Readonly<[() => void, 'only'?]>>;
}>) => {
    const selectedTests = tests.filter(([_, only]) => only);

    const ci = {
        ...ciInfo,
        isCI:
            JSON.parse(process.env.TESTS_CASES_IS_CI ?? 'false') === true
                ? true
                : ciInfo.isCI,
    } as typeof ciInfo;

    if (!(ci.isCI && selectedTests.length)) {
        return (!selectedTests.length ? tests : selectedTests).map(([test]) =>
            test()
        );
    }

    throw new Error(
        [
            '',
            `The following test${
                selectedTests.length === 1 ? '' : 's'
            } has "only" flagged`,
            boxen(selectedTests.map(([{ name }]) => name).join(`\n`), {
                padding: 1,
            }),
            'The "only" flag is not allowed in CI/CD environment',
            '',
        ].join('\n')
    );
};

export default testCases;
