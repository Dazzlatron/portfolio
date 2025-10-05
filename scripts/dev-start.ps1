# Development startup script for Windows PowerShell
Write-Host "🚀 Starting Portfolio Development Server..." -ForegroundColor Green

# Check if Node.js is installed
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✅ Node.js found, starting development server..." -ForegroundColor Green
    
    # Install dependencies if node_modules doesn't exist
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    # Start development server
    Write-Host "🌐 Starting live server on http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📝 Any changes to HTML/CSS/JS files will automatically refresh the browser!" -ForegroundColor Cyan
    Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Red
    
    npm run dev
} else {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Or use Docker: docker-compose -f docker-compose.dev.yml up --build" -ForegroundColor Cyan
}
