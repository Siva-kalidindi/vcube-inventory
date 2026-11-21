#!/bin/bash
echo "============================================================"
echo "  SAFELY SYNCING WITH LATEST CODE FROM GITHUB (Mac/Linux)..."
echo "============================================================"
echo ""

# Revert accidental changes to pom.xml
git checkout -- backend/pom.xml 2>/dev/null

echo "[1/3] Stashing your current progress..."
git stash

echo "[2/3] Downloading latest code from main..."
git pull origin main

echo "[3/3] Restoring your progress..."
git stash pop 2>/dev/null

echo ""
echo "============================================================"
echo "  SYNC COMPLETE! You have the latest code."
echo "============================================================"

