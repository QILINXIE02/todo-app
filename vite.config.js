import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTest.js'],
  },
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify('https://auth-api-todo.onrender.com/api/v1'), // Adjust the URL as per your API server configuration
  },
});
