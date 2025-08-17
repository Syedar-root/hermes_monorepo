import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // 库的入口文件
      name: 'Hermes', // 库的全局名称
      fileName: format => `hermes.${format}.js`, // 输出文件名
      formats: ['es', 'cjs'], // 输出格式（ES模块和CommonJS）
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['axios'],
      output: {
        // 提供全局变量，用于UMD构建模式
        globals: {
          axios: 'axios',
        },
      },
    },
  },
  plugins: [
    // 生成类型声明文件
    dts({
      insertTypesEntry: true,
    }),
  ],
})
