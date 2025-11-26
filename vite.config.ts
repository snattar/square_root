import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Define process.env.API_KEY globally for the browser build
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});