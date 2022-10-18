import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './shared';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            env: {
                TESTS_CASES_IS_CI: 'true',
            },
        },
    })
);
