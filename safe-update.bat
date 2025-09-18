@echo off
title Cell World - Safe Update
color 0E

echo ========================================
echo    CELL WORLD - SAFE UPDATE CHECK
echo ========================================
echo.

cd /d C:\Users\ictcl\OneDrive\Desktop\cell-world-web

echo Checking current git status...
echo.
git status
echo.
echo ========================================
echo Current commit:
git log --oneline -1
echo ========================================
echo.

echo Testing build before committing...
call npm run build

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ========================================
    echo    BUILD FAILED! DO NOT COMMIT!
    echo ========================================
    echo Fix the errors above before committing.
    echo.
    pause
    exit /b 1
)

color 0A
echo.
echo ========================================
echo    BUILD SUCCESSFUL! Safe to commit
echo ========================================
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "your message"
echo 3. git push origin main
echo.
echo Or press any key to auto-commit...
pause

set /p message="Enter commit message: "
git add .
git commit -m "%message%"
git push origin main

echo.
echo ========================================
echo    PUSHED TO GITHUB SUCCESSFULLY!
echo ========================================
echo Vercel will auto-deploy in a few moments.
echo.
pause