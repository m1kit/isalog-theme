import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Custom plugin to handle shader files
function shaderPlugin() {
  return {
    name: 'shader',
    load(id: string) {
      if (id.endsWith('.vert') || id.endsWith('.frag') || id.endsWith('.glsl')) {
        const shaderSource = readFileSync(id, 'utf-8')
        return `export default ${JSON.stringify(shaderSource)}`
      }
    }
  }
}

export default defineConfig({
  plugins: [shaderPlugin()],
  build: {
    outDir: 'assets/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        anim: './assets/js/anim.ts',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
})