import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            legacy({
                targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            Icons({
                // experimental
                autoInstall: true,
            })
        ],
        server: {
            host: '0.0.0.0',
            port: 8080,
            proxy: {
                '/api': {
                    target: env.VITE_LOGIN_API,
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path: string) => path.replace(/^\/api/, '')
                }
            },
        },
        build: {
            outDir: 'static',
            esbuild: {
                drop: ['console', 'debugger'],
            },
        },
    }
});
