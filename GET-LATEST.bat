@echo off
echo ============================================================
echo   SAFELY SYNCING WITH LATEST CODE FROM GITHUB...
echo ============================================================
echo.

:: 1. Revert any accidental changes to pom.xml or maven files
git checkout -- backend/pom.xml 2>nul

:: 2. Stash local work so pull never conflicts
echo [1/3] Stashing your current progress...
git stash

:: 3. Pull the latest from origin main
echo [2/3] Downloading latest code from main...
git pull origin main

:: 4. Re-apply their stashed work
echo [3/3] Restoring your progress...
git stash pop 2>nul

echo.
echo ============================================================
echo   SYNC COMPLETE! You have the latest code and your work is intact.
echo ============================================================
pause
