import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    react()
  ],
  // 若需要配置 less 选项，可以添加以下内容
  css: {
    preprocessorOptions: {
      less: {
        // 可按需添加 less 配置
        javascriptEnabled: true
      }
    }
  }
});