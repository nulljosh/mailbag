#!/bin/sh
# Copy the brand files the landing shares, then deploy the Worker (which serves landing/).
set -e
cd "$(dirname "$0")"
mkdir -p landing/fonts
cp brand/tokens.css brand/mark.svg icon.svg landing/
cp fonts/*.woff2 fonts/OFL.txt landing/fonts/
[ "$1" = "--copy-only" ] && exit 0
npx wrangler deploy
