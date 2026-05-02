import { defineConfig } from 'vite';
import { resolve, dirname, join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to serve JS files as static assets without transformation

function staticJsPlugin() {
  return {
    name: 'static-js',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Serve JS files from assets/js as static files without transformation
        if (req.url && req.url.startsWith('/assets/js/') && req.url.endsWith('.js')) {
          try {
            const filePath = join(process.cwd(), req.url);
            const content = readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/javascript');
            res.end(content);
            return;
          } catch (e) {
            // If file not found, continue to next middleware
          }
        }
        next();
      });
    },
  };
}

// Get all HTML files as entry points
function getHtmlFiles() {
  const files = {};
  
  // Main index.html
  files['index'] = resolve(__dirname, 'index.html');
  
  // Pages directory
  try {
    const pages = readdirSync(resolve(__dirname, 'pages'));
    pages.forEach(file => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '');
        files[`pages/${name}`] = resolve(__dirname, 'pages', file);
      }
    });
  } catch (e) {
    // Pages directory might not exist
  }
  
  return files;
}

export default defineConfig({
  root: '.',
  plugins: [staticJsPlugin()],
  // Don't use publicDir - serve everything from root
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlFiles(),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash].css';
          }
          return 'assets/js/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    cors: true,
    // Ensure static files are served correctly
    middlewareMode: false,
    fs: {
      // Allow serving files from project root
      allow: ['..'],
    },
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    // Don't pre-bundle these files
    include: ['assets/css/**'],
    exclude: ['assets/js/**'],
  },
  // Don't transform JS files in assets/js
  esbuild: {
    exclude: ['assets/js/**'],
  },
});

