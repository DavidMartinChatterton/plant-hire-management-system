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
      '/selectedOrderLines': 'http://localHost:5000',
      '/orderStatusList': 'http://localhost:5000',
      '/resourceList': 'http://localhost:5000',
      '/employeeList': 'http://localhost:5000',
      '/UOMList': 'http://localhost:5000',
      '/lineStatusList': 'http://localhost:5000'
      
    },
  },
})
