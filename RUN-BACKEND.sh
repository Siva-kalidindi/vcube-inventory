#!/bin/bash
echo "============================================================"
echo "  STARTING SPRING BOOT INVENTORY APPLICATION (Mac/Linux)..."
echo "============================================================"
echo ""

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BUNDLED_MVN="$DIR/apache-maven-3.9.6/bin/mvn"
chmod +x "$BUNDLED_MVN" 2>/dev/null

cd "$DIR/backend"

if [ ! -f "target/inventory-0.0.1-SNAPSHOT.jar" ]; then
    echo "[1/2] Packaging backend JAR..."
    if [ -f "$BUNDLED_MVN" ]; then
        "$BUNDLED_MVN" clean package -DskipTests
    else
        mvn clean package -DskipTests
    fi
fi

echo ""
echo "[2/2] Launching server on http://localhost:8080 ..."
echo "(Keep this terminal window OPEN! Closing it stops the server)"
echo ""

java -jar target/inventory-0.0.1-SNAPSHOT.jar
