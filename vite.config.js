import {defineConfig} from 'vite'

export default defineConfig({
    base: '/avec-frontend/', // важно для правильных путей
    build: {
        outDir: 'dist'
    }
})