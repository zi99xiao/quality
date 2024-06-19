import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            legacy({
                targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
            }),
        ],
        base: './',
        server: {
            host: '0.0.0.0',
            port: 8080,
            // hmr: {
            //     protocol: 'ws',
            //     host: url.IP,
            // },
            proxy: {
                '/api': {
                    target: env.VITE_LOGIN_API,
                    changeOrigin: true,
                    ws: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                }
            },
        },
    }
});
