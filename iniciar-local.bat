@echo off
chcp 65001 >nul
title CABA - Servidor local
cd /d "%~dp0"
where node >nul 2>nul || (echo Falta Node.js: instalalo desde https://nodejs.org y vuelve a abrir este archivo. & start https://nodejs.org & pause & exit /b 1)
if not exist node_modules (echo Instalando dependencias por primera vez... & call npm install)
start "" http://localhost:3000
call npm run dev
pause
