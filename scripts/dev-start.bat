@echo off
echo 🚀 Starting Portfolio Development Server...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    echo Or use Docker: docker-compose -f docker-compose.dev.yml up --build
    pause
    exit /b 1
)

echo ✅ Node.js found, starting development server...
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Start development server
echo 🌐 Starting live server on http://localhost:3000
echo 📝 Any changes to HTML/CSS/JS files will automatically refresh the browser!
echo 🛑 Press Ctrl+C to stop the server
echo.

npm run dev

pause
