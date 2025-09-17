import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'
// @ts-expect-error next line is actually correct - from the docs
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [{
        browser: 'chromium'
      }, {
        browser: 'firefox'
      }]
    },
    projects: [
      {
        test: {
          name: 'node',
          include: ['tests/**/*.{test,spec}.{ts,mts,cts,tsx}'],
          environment: 'happy-dom',
          globals: true
        }
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })],
        test: {
          name: 'storybook',
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  }
})