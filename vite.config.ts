import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
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
                target: 'http://192.168.218.204:8023/centre-auth-server',
                changeOrigin: true,
                ws: true,
                rewrite: path => path.replace(/^\/api/, ''),
            }
        },
    },
});
