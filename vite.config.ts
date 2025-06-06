import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/rewise/' : '/'

  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 确保构建后的资源能正确引用
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
})
