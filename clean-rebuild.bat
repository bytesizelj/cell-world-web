@echo off
title Cell World - Clean Rebuild
color 0A

echo ========================================
echo    CELL WORLD - CLEAN REBUILD TOOL     
echo ========================================
echo.

:: Navigate to project directory
cd /d C:\Users\ictcl\OneDrive\Desktop\cell-world-web

echo Current directory: %cd%
echo.
echo Step 1: Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo Step 2: Deleting .next folder...
if exist .next (
    rmdir /s /q .next
    echo    [DELETED] .next folder
) else (
    echo    [SKIPPED] .next folder not found
)

echo.
echo Step 3: Deleting node_modules folder (this may take a moment)...
if exist node_modules (
    rmdir /s /q node_modules
    echo    [DELETED] node_modules folder
) else (
    echo    [SKIPPED] node_modules folder not found
)

echo.
echo Step 4: Deleting package-lock.json...
if exist package-lock.json (
    del /f /q package-lock.json
    echo    [DELETED] package-lock.json
) else (
    echo    [SKIPPED] package-lock.json not found
)

echo.
echo Step 5: Deleting .cache folder...
if exist .cache (
    rmdir /s /q .cache
    echo    [DELETED] .cache folder
) else (
    echo    [SKIPPED] .cache folder not found
)

echo.
echo Step 6: Clearing npm cache...
call npm cache clean --force
echo    [CLEARED] npm cache

echo.
echo ========================================
echo Step 7: Installing fresh dependencies...
echo ========================================
call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed!
    echo Please check your internet connection and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    CLEAN REBUILD COMPLETE!
echo ========================================
echo.
echo Starting development server...
echo Press Ctrl+C to stop the server
echo.
echo Opening browser at http://localhost:3000
timeout /t 3 >nul
start http://localhost:3000

echo.
call npm run dev

pause