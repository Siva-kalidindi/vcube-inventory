@echo off
echo ============================================================
echo   EMERGENCY FIX: RESTORING WORKING BACKEND CONFIG...
echo ============================================================
echo.

:: Discard unwanted modifications to pom.xml and application.yml
git checkout -- backend/pom.xml
git checkout -- backend/src/main/resources/application.yml

:: Pull latest clean version
git pull origin main

echo.
echo ============================================================
echo   DONE! Your pom.xml and configs are restored to the working version.
echo ============================================================
pause
