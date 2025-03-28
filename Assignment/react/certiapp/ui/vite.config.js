import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    port:3000,//used to change port
    proxy:{
      '/api':{
        target:"http://api:8003/",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,"")
      },
    },
  },
})
