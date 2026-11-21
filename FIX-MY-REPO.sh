#!/bin/bash
echo "============================================================"
echo "  EMERGENCY FIX: RESTORING WORKING BACKEND CONFIG..."
echo "============================================================"
echo ""

git checkout -- backend/pom.xml
git checkout -- backend/src/main/resources/application.yml

git pull origin main

echo ""
echo "============================================================"
echo "  DONE! Your pom.xml and configs are restored."
echo "============================================================"

