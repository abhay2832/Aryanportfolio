import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name so the site works at
// https://abhay2832.github.io/Aryanportfolio/
export default defineConfig({
  plugins: [react()],
  base: '/Aryanportfolio/',
})
