# 🐳 Docker Guide for Portfolio

Your portfolio now supports both development and production Docker deployments while maintaining the same localhost:8080 access!

## 🚀 Quick Start

### **Development Mode (with Vite)**
```bash
# Start development container with hot reload
npm run docker:dev

# Or manually:
docker-compose -f config/docker-compose.dev.yml up --build
```

### **Production Mode (optimized build)**
```bash
# Start production container
npm run docker:prod

# Or manually:
docker-compose -f config/docker-compose.yml up --build
```

### **Stop Containers**
```bash
npm run docker:stop
```

## 🎯 **Access Your Portfolio**

Both modes will be available at: **`http://localhost:8080`**

## 📊 **Development vs Production**

### **Development Mode Features:**
- ✅ **Vite dev server** with hot module replacement
- ✅ **Live reloading** - changes reflect instantly
- ✅ **Source maps** for debugging
- ✅ **Volume mounting** for real-time file changes
- ✅ **Fast startup** with development optimizations

### **Production Mode Features:**
- ✅ **Optimized build** with minification
- ✅ **Nginx server** for high performance
- ✅ **Gzip compression** for faster loading
- ✅ **Security headers** for protection
- ✅ **Asset caching** for better performance

## 🔧 **Configuration Details**

### **Port Mapping:**
- **Development:** `8080:3000` (host:container)
- **Production:** `8080:80` (host:container)

### **Volume Mounts (Development):**
- Source code: `.:/app`
- Node modules: `/app/node_modules` (excluded for performance)
- Build output: `/app/dist` (excluded for performance)

## 🛠️ **Available Commands**

```bash
# Development
npm run docker:dev          # Start dev container
npm run dev                 # Start Vite locally (without Docker)

# Production
npm run docker:prod         # Start production container
npm run build              # Build for production locally
npm run preview            # Preview production build locally

# Docker Management
npm run docker:stop        # Stop all containers
docker-compose logs        # View container logs
docker-compose down        # Stop and remove containers
```

## 🎨 **Development Workflow**

1. **Start development container:**
   ```bash
   npm run docker:dev
   ```

2. **Access your portfolio:**
   - Open `http://localhost:8080`
   - Make changes to your files
   - See changes instantly with hot reload

3. **Build for production:**
   ```bash
   npm run build
   npm run docker:prod
   ```

## 🚀 **Performance Benefits**

### **Development:**
- **Hot Module Replacement** - instant updates
- **Fast cold start** - no bundling in development
- **Source maps** - easy debugging
- **Volume mounting** - real-time file changes

### **Production:**
- **Optimized bundles** - smaller file sizes
- **Nginx caching** - faster loading
- **Gzip compression** - reduced bandwidth
- **Security headers** - protection against attacks

## 🔍 **Troubleshooting**

### **Port Already in Use:**
```bash
# Stop existing containers
npm run docker:stop

# Or change port in docker-compose files
# Edit ports: "8081:3000" for development
# Edit ports: "8081:80" for production
```

### **Build Issues:**
```bash
# Clean rebuild
docker-compose -f config/docker-compose.dev.yml down
docker-compose -f config/docker-compose.dev.yml up --build --force-recreate
```

### **Permission Issues:**
```bash
# On Linux/Mac, you might need:
sudo docker-compose -f config/docker-compose.dev.yml up --build
```

### **View Logs:**
```bash
# Development logs
docker-compose -f config/docker-compose.dev.yml logs -f

# Production logs
docker-compose -f config/docker-compose.yml logs -f
```

## 🎯 **Migration from Current Setup**

Your current setup will continue to work! You can:

1. **Keep using your current server:** `npm run serve` (http-server)
2. **Switch to Vite locally:** `npm run dev`
3. **Use Docker development:** `npm run docker:dev`
4. **Use Docker production:** `npm run docker:prod`

All methods will be available at `localhost:8080` (or the port you configure).

## 🚀 **Next Steps**

1. **Try development mode:**
   ```bash
   npm run docker:dev
   ```

2. **Test your portfolio** at `http://localhost:8080`

3. **Make some changes** and see hot reload in action

4. **Build for production:**
   ```bash
   npm run docker:prod
   ```

Your portfolio is now ready for modern Docker development and deployment! 🐳✨
