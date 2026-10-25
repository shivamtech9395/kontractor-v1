@echo off
title Kontractor - Luxury Construction and Architectural Marketplace
color 0B

echo =====================================================================
echo           KONTRACTOR - ARCHITECTURAL AND CONSTRUCTION TECH
echo                   "Building Trust, Brick by Brick"
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not found in your system PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detected:
node -v
echo.

echo [2/4] Verifying server dependencies...
if not exist "%~dp0server\node_modules" (
    echo Installing server dependencies, please wait...
    cd /d "%~dp0server"
    call npm install
    cd /d "%~dp0"
)
if not exist "%~dp0client\node_modules" (
    echo Installing client dependencies, please wait...
    cd /d "%~dp0client"
    call npm install
    cd /d "%~dp0"
)

echo [3/4] Starting Backend API Server on Port 5000...
start "Kontractor Backend Server (Port 5000)" /D "%~dp0server" cmd /k "node server.js"

ping -n 3 127.0.0.1 >nul

echo [4/4] Starting Frontend Web Application on Port 5173...
start "Kontractor Frontend Client (Port 5173)" /D "%~dp0client" cmd /k "npm run dev"

ping -n 4 127.0.0.1 >nul

echo.
echo =====================================================================
echo                 KONTRACTOR PLATFORM IS LIVE!
echo =====================================================================
echo.
echo   * Frontend Web UI:  http://localhost:5173
echo   * Backend REST API: http://localhost:5000
echo.
echo   Opening website in your default browser...
echo =====================================================================
echo.

start http://localhost:5173

echo.
echo ---------------------------------------------------------------------
echo NOTE: Both Backend and Frontend are running in separate windows.
echo Keep this window open, or minimize it.
echo ---------------------------------------------------------------------
echo.
echo Press any key to re-open http://localhost:5173 in browser...
echo Or close this window to exit launcher (servers will keep running).
pause
start http://localhost:5173
