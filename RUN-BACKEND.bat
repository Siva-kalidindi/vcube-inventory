@echo off
echo ============================================================
echo   STARTING SPRING BOOT INVENTORY APPLICATION...
echo ============================================================
echo.

set "MAVEN_HOME=%~dp0apache-maven-3.9.6"
set "PATH=%MAVEN_HOME%\bin;%PATH%"

cd "%~dp0backend"

echo [1/2] Building latest backend JAR...
call mvn package -DskipTests

echo.
echo [2/2] Launching server on http://localhost:8080 ...
echo (Keep this window OPEN! Closing this stops the backend)
echo.

java -jar target\inventory-0.0.1-SNAPSHOT.jar

pause
