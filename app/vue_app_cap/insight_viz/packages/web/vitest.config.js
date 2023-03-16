import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig, { pathResolve } from './vite.config';
export default mergeConfig(viteConfig, defineConfig({
    test: {
        // jest like test api
        globals: true,
        include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        // 模拟dom环境
        environment: 'happy-dom',
        // 支持tsx,jsx
        transformMode: {
            web: [/.[tj]sx$/]
        }
    },
    resolve: {
        alias: [
            // 配置模块的路径别名
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/'
            }
        ]
    }
}));
