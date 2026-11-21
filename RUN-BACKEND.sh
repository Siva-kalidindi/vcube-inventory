#!/bin/bash
echo "============================================================"
echo "  STARTING SPRING BOOT INVENTORY BACKEND (Mac/Linux)..."
echo "============================================================"
echo ""

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR/backend"

if command -v mvn &> /dev/null; then
    mvn spring-boot:run
else
    echo "Maven not found in PATH."
    echo "Please install Maven via: brew install maven"
fi

