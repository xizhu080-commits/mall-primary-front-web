import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'window',
    'process.env': {},
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 确保 @ 别名可用
    },
  },
  server: {
    open: true, // 自动打开浏览器
    host: true, // 允许局域网访问
    hmr: true, // 开启热模块替换
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 你的后端地址
        changeOrigin: true,
      },

      // 【关键】WebSocket 代理配置
      '/ws': {
        target: 'ws://localhost:8080', // 注意这里是 ws://
        ws: true, // 必须开启，表示代理 WebSocket
        changeOrigin: true,
      },
    },
  },
})
