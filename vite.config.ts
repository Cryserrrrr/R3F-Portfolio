import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      glsl()
    ],
    server: {
      host: true,
    },
  }
})
