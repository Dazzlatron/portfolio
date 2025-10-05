// Deployment configuration for various platforms

export const deploymentConfigs = {
  // Netlify
  netlify: {
    buildCommand: 'npm run build',
    publishDirectory: 'dist',
    functions: {},
    redirects: [
      {
        from: '/*',
        to: '/index.html',
        status: 200
      }
    ]
  },
  
  // Vercel
  vercel: {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    framework: 'vite',
    rewrites: [
      {
        source: '/(.*)',
        destination: '/index.html'
      }
    ]
  },
  
  // GitHub Pages
  github: {
    base: '/portfolio/', // Your repo name
    buildCommand: 'npm run build',
    outputDirectory: 'dist'
  }
}

// Environment-specific settings
export const environments = {
  development: {
    base: '/',
    apiUrl: 'http://localhost:3000'
  },
  production: {
    base: '/',
    apiUrl: 'https://your-domain.com'
  }
}
