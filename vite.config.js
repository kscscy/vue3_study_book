import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // todo. check path
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: path.resolve(__dirname, './src/webApp/')
      },
      {
        find: '@components/',
        replacement: path.resolve(__dirname, './src/webApp/components/')
      },
      {
        find: '@app_modules/',
        replacement: path.resolve(__dirname, './src/webApp/modules/')
      },
      {
        find: '@store/',
        replacement: path.resolve(__dirname, './src/webApp/store/')
      },
    ]
  }
})
