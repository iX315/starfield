import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'types',
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: '/src/index.ts',
      name: 'starfield-next',
      fileName: (format) => `starfield-next.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  }
})
