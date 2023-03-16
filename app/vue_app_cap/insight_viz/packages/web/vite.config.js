import { defineConfig, loadEnv } from 'vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
export function pathResolve(dir) {
    return resolve(process.cwd(), '.', dir);
}
// 配置nutUI插件
const NutUIResolver = () => {
    return (name) => {
        if (name.startsWith('Nut')) {
            const partialName = name.slice(3);
            return {
                name: partialName,
                from: '@nutui/nutui',
                sideEffects: `@nutui/nutui/dist/packages/${partialName.toLowerCase()}/style`
            };
        }
    };
};
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    // 配置 nutui 全局 scss 变量
                    additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`
                }
            }
        },
        server: {
            host: true,
            port: 3000,
            proxy: {
                // 使用 proxy 实例
                '^/cap/api/.*': {
                    target: `http://${loadEnv(mode, process.cwd()).VITE_DEV_HOST}`,
                    changeOrigin: true
                }
            }
        },
        optimizeDeps: {
            include: ['vue']
        },
        plugins: [
            vue(),
            vueJsx(),
            Components({
                resolvers: [NutUIResolver()]
            })
        ],
        resolve: {
            alias: [
                // 配置模块的路径别名
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/'
                }
            ]
        }
    };
});
