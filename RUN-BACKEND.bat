@echo off
echo ============================================================
echo   STARTING SPRING BOOT INVENTORY BACKEND...
echo ============================================================
echo.

set "MAVEN_HOME=%~dp0apache-maven-3.9.6"
set "PATH=%MAVEN_HOME%\bin;%PATH%"

cd "%~dp0backend"
call mvn spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ============================================================
    echo   BUILD / RUN ENCOUNTERED AN ERROR!
    echo   Please check if Java 17 is installed.
    echo ============================================================
)
pause

