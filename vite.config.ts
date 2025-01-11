import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Log environment loading for debugging
  console.log('Loading Vite config:', {
    command,
    mode,
    envKeys: Object.keys(env).filter(key => key.startsWith('VITE_'))
  });

  return {
    plugins: [
      react(), 
      svgr(), 
      tsconfigPaths(),
      VitePWA({
        manifest: {
          name: 'WebReact',
          short_name: 'WebReact',
          description: 'WebReact Portfolio Application',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // Ensure environment variables are loaded
    envDir: process.cwd(),
    envPrefix: 'VITE_',
    // Add this for better error messages
    build: {
      sourcemap: true
    },
    // Add this for better error handling
    server: {
      port: 5174,
      strictPort: false,
      open: true,
      hmr: {
        overlay: true
      }
    },
    // Make environment variables available
    define: {
      __ENV__: JSON.stringify(env)
    }
  };
});