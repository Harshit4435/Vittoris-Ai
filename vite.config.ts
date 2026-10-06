import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

const redirectRootPlugin = (): Plugin => ({
  name: 'redirect-root',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/' || req.url === '' || req.url === '/solis-lux' || req.url === '/solis-lux/' || req.url === '/vittoris-ai' || req.url === '/vittoris-ai/') {
        res.writeHead(302, { Location: '/Vittoris-Ai/' })
        res.end()
        return
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/' || req.url === '' || req.url === '/solis-lux' || req.url === '/solis-lux/' || req.url === '/vittoris-ai' || req.url === '/vittoris-ai/') {
        res.writeHead(302, { Location: '/Vittoris-Ai/' })
        res.end()
        return
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  base: '/Vittoris-Ai/',
  plugins: [react(), tailwindcss(), redirectRootPlugin()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
})


