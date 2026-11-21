@echo off
echo ============================================
echo   SAVING YOUR WORK TO GITHUB...
echo ============================================
echo.

set /p MSG="What did you work on? (e.g. added login page): "

git add .
git commit -m "%MSG%"
git push

echo.
if %ERRORLEVEL% == 0 (
    echo   DONE! Your work is saved.
) else (
    echo.
    echo   IT DIDN'T WORK. Try this:
    echo   1. Close this window
    echo   2. Double-click GET-LATEST.bat first
    echo   3. Then try SAVE-MY-WORK.bat again
    echo   4. If still broken, tell Setup Person
)
echo.
pause

