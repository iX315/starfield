import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'types',
      tsconfigPath: 'tsconfig.lib.json'
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: ['/src/lib/starfield.ts', '/src/components/Starfield.component.tsx'],
      name: 'starfield-next'
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          'react-dom': 'ReactDom',
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime'
        }
      }
    }
  }
})
