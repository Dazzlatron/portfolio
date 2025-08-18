# Portfolio Development Setup

This portfolio website now includes automatic live reload functionality for development!

## 🚀 Quick Start (Recommended)

### Option 1: Local Development (Fastest)
1. **Install Node.js** from [https://nodejs.org/](https://nodejs.org/)
2. **Run the development script:**
   - Windows: Double-click `dev-start.bat` or run `dev-start.ps1` in PowerShell
   - Mac/Linux: Run `npm run dev` in terminal
3. **Open your browser** to `http://localhost:3000`
4. **Make changes** to any HTML, CSS, or JS files
5. **Watch the magic!** Your browser will automatically refresh when you save files

### Option 2: Docker Development
1. **Build and start the development container:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```
2. **Open your browser** to `http://localhost:3000`
3. **Make changes** to any files - they'll automatically refresh!

## 🔧 How It Works

- **Live Server**: Automatically watches for file changes
- **Volume Mounting**: Docker container sees your local files in real-time
- **Instant Refresh**: Browser refreshes automatically when you save
- **No Manual Refresh Needed**: Just save your files and see changes instantly!

## 📁 File Structure

```
portfolio/
├── docker-compose.dev.yml    # Development Docker setup
├── Dockerfile.dev            # Development Docker image
├── dev-start.bat            # Windows batch file
├── dev-start.ps1            # PowerShell script
├── package.json             # Node.js dependencies
└── ... (your website files)
```

## 🛠️ Available Commands

- `npm run dev` - Start development server with live reload
- `npm run start` - Start production server
- `npm run build` - Build for production (not needed for static sites)

## 🌐 Ports

- **Development**: `http://localhost:3000` (with live reload)
- **Production**: `http://localhost:8080` (static files only)

## 💡 Tips

1. **Keep the terminal open** while developing - the live server needs to run
2. **Save files** to trigger automatic refresh
3. **Use the browser's dev tools** - they work perfectly with live reload
4. **Multiple browsers** can connect to the same live server

## 🐛 Troubleshooting

### "Node.js not found"
- Install Node.js from [https://nodejs.org/](https://nodejs.org/)
- Or use Docker: `docker-compose -f docker-compose.dev.yml up --build`

### "Port already in use"
- Stop other development servers
- Or change the port in `package.json` scripts

### "Dependencies not found"
- Run `npm install` to install required packages

## 🚀 Production

When you're ready to deploy:
1. Use the original `docker-compose.yml` for production
2. Or deploy the static files directly to any web server

---

**Happy coding! 🎉** Your changes will now appear instantly in the browser!
