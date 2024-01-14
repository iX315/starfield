import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: '/src/index.ts',
      name: 'starfield-next',
      fileName: (format) => `starfield-next.${format}.js`,
    },
  },
})
