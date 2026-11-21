#!/bin/bash
echo "============================================================"
echo "  SAVING YOUR WORK TO GITHUB (Mac/Linux)..."
echo "============================================================"
echo ""

read -p "What did you work on? (e.g. added login page): " MSG

git add .
git commit -m "$MSG"
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "  DONE! Your work is saved on GitHub."
else
    echo ""
    echo "  IT DIDN'T WORK. Try this:"
    echo "  1. Run ./GET-LATEST.sh first"
    echo "  2. Then try ./SAVE-MY-WORK.sh again"
    echo "  3. If still broken, tell Setup Person"
fi
echo "============================================================"

