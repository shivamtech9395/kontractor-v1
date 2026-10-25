@echo off
title Kontractor Backend Server (Port 5000)
color 0A
cd /d "%~dp0server"
echo ===================================================
echo     Starting Kontractor Backend (Port 5000)...
echo ===================================================
echo.
node server.js
pause
