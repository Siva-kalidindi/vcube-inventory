@echo off
echo ============================================
echo   GETTING LATEST CODE FROM TEAM...
echo ============================================
echo.

git pull --rebase

echo.
if %ERRORLEVEL% == 0 (
    echo   DONE! You have everyone's latest code.
) else (
    echo.
    echo   THERE'S A CONFLICT. Don't panic.
    echo   1. Tell Setup Person
    echo   2. They will fix it for you
    echo   3. Run: git rebase --abort  (to undo)
)
echo.
pause

