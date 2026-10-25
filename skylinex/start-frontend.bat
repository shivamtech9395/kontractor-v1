@echo off
title Kontractor Frontend Client (Port 5173)
color 0B
cd /d "%~dp0client"
echo ===================================================
echo     Starting Kontractor Frontend (Port 5173)...
echo ===================================================
echo.
npm run dev
pause
