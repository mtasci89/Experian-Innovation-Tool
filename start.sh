#!/bin/bash
# Innovation Tool - Local server starter
# Run this script to serve the tool locally

PORT=${1:-8080}
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  🚀 Innovation Tool başlatılıyor..."
echo "  ──────────────────────────────────"
echo "  Tarayıcıda açın: http://localhost:$PORT"
echo "  Durdurmak için:  Ctrl+C"
echo ""

cd "$DIR"
python3 -m http.server $PORT
