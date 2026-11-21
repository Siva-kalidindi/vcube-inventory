#!/bin/bash
echo "============================================================"
echo "  STARTING SPRING BOOT INVENTORY BACKEND (Mac/Linux)..."
echo "============================================================"
echo ""

# Get script root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BUNDLED_MVN="$DIR/apache-maven-3.9.6/bin/mvn"

# Make sure the bundled mvn binary has execute permission
chmod +x "$BUNDLED_MVN" 2>/dev/null

cd "$DIR/backend"

if [ -f "$BUNDLED_MVN" ]; then
    echo "Using bundled Maven ($BUNDLED_MVN)..."
    "$BUNDLED_MVN" spring-boot:run
elif command -v mvn &> /dev/null; then
    echo "Using system Maven..."
    mvn spring-boot:run
else
    echo "Error: Maven not found."
    echo "Please ensure apache-maven-3.9.6 is in the root directory."
fi
