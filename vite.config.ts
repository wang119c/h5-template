import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'node:path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'

const env = loadEnv('development', process.cwd())
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    viteCompression(),
    legacy({
      targets: ['> 0%', 'Chrome > 4', 'Android >= 4', 'IOS >= 7', 'not ie <= 6', 'Firefox ESR'],
      modernPolyfills: true,
      renderLegacyChunks: true
    }),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [resolve(__dirname, 'src/assets/svgs')],
      // 执行icon name 的格式
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: '要代理的url',
        changeOrigin: true,
        rewrite: (path) => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), '')
      }
    }
  },
  css: {
    // css 预处理器
    preprocessorOptions: {
      // provide global variables
      less: {
        additionalData: `
          @import "@/styles/mixins.less";
          @import "@/styles/variables.less";
        `
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 5000,
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log'],
        // drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    }
  }
})
