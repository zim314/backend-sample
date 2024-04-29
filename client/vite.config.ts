import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    return {
        base: '/',
        plugins: [
            react(),
            tsconfigPaths(),
            createHtmlPlugin({
                minify: true,
                entry: '/src/main.tsx',
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE,
                    },
                },
            }),
        ],
        css: { preprocessorOptions: { scss: { charset: false } } },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://apiserver.com/',
                    changeOrigin: true,
                },
            },
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
    };
});
