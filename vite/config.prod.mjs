import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    plugins: [
        react(),
    ],
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        }
    }
})
