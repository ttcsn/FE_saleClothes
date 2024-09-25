import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/src',  // Đường dẫn alias nên bắt đầu bằng dấu '/'
    },
  },
});
