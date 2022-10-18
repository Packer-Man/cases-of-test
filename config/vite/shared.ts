import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        watch: false,
        testTimeout: 43600,
        include: ['test/index.ts'],
    },
});
