# 🚀 Vite Setup for Portfolio

This guide will help you set up and use Vite for your portfolio development and deployment.

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Benefits of Using Vite

### ⚡ **Performance**
- **Instant Hot Module Replacement (HMR)** - Changes reflect immediately
- **Fast cold start** - No bundling in development
- **Optimized builds** - Tree-shaking, code splitting, minification

### 🎨 **CSS Organization**
- **CSS Modules** - Scoped styles
- **PostCSS** - Modern CSS features
- **Autoprefixer** - Automatic vendor prefixes
- **CSS Nesting** - Write nested CSS like Sass

### 📁 **File Organization**
```
src/
├── styles/
│   └── main.css          # Main CSS entry point
├── js/
│   └── main.js           # Main JS entry point
└── assets/               # Static assets
```

## 🛠️ Development Workflow

### 1. **Start Development Server**
```bash
npm run dev
```
- Opens at `http://localhost:3000`
- Hot reloading enabled
- Source maps for debugging

### 2. **CSS Development**
- Edit `src/styles/main.css` for global styles
- Use CSS variables for theming
- PostCSS processes automatically

### 3. **JavaScript Development**
- Edit `src/js/main.js` for main functionality
- Import modules as needed
- ES6+ features supported

## 🚀 Deployment Options

### **Option 1: Netlify (Recommended)**
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### **Option 2: Vercel**
1. Import project to Vercel
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### **Option 3: GitHub Pages**
1. Enable GitHub Pages in repo settings
2. Source: GitHub Actions
3. Workflow automatically deploys on push

## 📊 Build Optimization

### **CSS Optimization**
- **Autoprefixer** - Adds vendor prefixes
- **CSSnano** - Minifies CSS
- **Tree-shaking** - Removes unused CSS
- **Code splitting** - Loads CSS per page

### **JavaScript Optimization**
- **ES6+ transpilation** - Modern JS features
- **Tree-shaking** - Removes unused code
- **Code splitting** - Loads JS per page
- **Minification** - Reduces file size

## 🎨 CSS Features

### **CSS Variables**
```css
:root {
  --primary-color: #FF1515;
  --spacing-md: 1rem;
  --transition-normal: 0.3s ease;
}
```

### **CSS Nesting**
```css
.button {
  background: var(--primary-color);
  
  &:hover {
    opacity: 0.8;
  }
  
  &.large {
    padding: var(--spacing-md);
  }
}
```

### **Import Organization**
```css
/* Base Styles */
@import '../assets/css/fonts.css';
@import '../assets/css/styles.css';

/* Component Styles */
@import '../assets/css/nav.css';
@import '../assets/css/hero.css';
```

## 🔧 Configuration Files

- `vite.config.js` - Main Vite configuration
- `postcss.config.js` - PostCSS plugins
- `package.json` - Dependencies and scripts
- `.github/workflows/deploy.yml` - CI/CD pipeline

## 📈 Performance Benefits

### **Before Vite**
- Multiple CSS files loaded separately
- No CSS optimization
- Manual asset management
- Slower development server

### **After Vite**
- Single optimized CSS bundle
- Automatic CSS optimization
- Intelligent asset handling
- Lightning-fast development

## 🚀 Next Steps

1. **Run the development server**: `npm run dev`
2. **Test your portfolio** at `http://localhost:3000`
3. **Build for production**: `npm run build`
4. **Deploy to your chosen platform**

## 🆘 Troubleshooting

### **Port already in use**
```bash
npm run dev -- --port 3001
```

### **Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **CSS not loading**
- Check import paths in `src/styles/main.css`
- Ensure PostCSS is configured correctly
- Verify file extensions (.css)

## 🎯 Migration Checklist

- [x] Vite configuration created
- [x] PostCSS setup complete
- [x] CSS entry point organized
- [x] JavaScript entry point created
- [x] Build scripts configured
- [x] Deployment configs ready
- [x] CI/CD pipeline setup

Your portfolio is now ready for modern development and deployment! 🚀
