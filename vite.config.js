import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Đường dẫn tương đối giúp ứng dụng hoạt động hoàn hảo trên cả GitHub Pages lẫn Vercel
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: '0.0.0.0', // Lắng nghe trên mạng nội bộ cho điện thoại kết nối qua Wi-Fi
    port: 3000,
    open: false
  }
})
