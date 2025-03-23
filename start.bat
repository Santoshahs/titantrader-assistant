@echo off
echo Killing any process using port 5050...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5050" ^| find "LISTENING"') do (
    echo Found process: %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo Starting TitanTrader server...
node server.js
pause
