import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Determine project root based on config directory location
let projectRoot = process.cwd()
let configPath = path.resolve(projectRoot, 'mango')

// If config doesn't exist in current directory, check parent
if (!fs.existsSync(configPath)) {
  projectRoot = path.resolve(projectRoot, '..')
  configPath = path.resolve(projectRoot, 'mango')

  if (!fs.existsSync(configPath)) {
    throw new Error(
      'Mango folder not found. Please ensure your mango folder exists either in the current directory or parent directory.'
    )
  }
}


export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@config': configPath,
      '@mango': configPath,
      '@settings': path.resolve(configPath, 'config/settings.json'),
      '@collections': path.resolve(configPath, 'config/.collections.json'),
      '@plugins': path.resolve(configPath, 'plugins'),
      'vue': path.resolve(__dirname, 'node_modules/vue'),
    },
  },
  optimizeDeps: {
    exclude: ['vue'],
  },

base: '/',
  build: { outDir: 'docs', emptyOutDir: true }
})
