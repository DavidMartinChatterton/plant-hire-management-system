import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/add-customer': 'http://localhost:5000',
      '/customers': 'http://localhost:5000',
      '/customerList': 'http://localhost:5000',
      '/new-order': 'http://localhost:5000',
      '/openOrdersForCustomer': 'http://localhost:5000',
    },
  },
})
