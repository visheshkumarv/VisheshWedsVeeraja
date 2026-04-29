#!/usr/bin/env bash
# Build the React frontend and copy the static output to the repo root
# so GitHub Pages can serve it from main / root.
#
# Usage:  bash scripts/build-for-pages.sh

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo ">> Installing frontend dependencies…"
yarn install --silent

echo ">> Building production bundle…"
yarn build

echo ">> Copying build output to repo root…"
cd "$ROOT"

# Remove previous build artifacts from root (but keep source folders intact)
rm -rf "$ROOT/static" "$ROOT/asset-manifest.json" "$ROOT/index.html"

# Copy ALL build outputs (index.html, static/, plus any public assets like
# DSC07099.jpg, favicon.ico, manifest.json, etc.) to the repo root.
cp -r "$ROOT/frontend/build/." "$ROOT/"

# Ensure GitHub Pages serves files literally (no Jekyll processing)
touch "$ROOT/.nojekyll"

echo ""
echo "✅ Done. Commit and push:"
echo ""
echo "   git add ."
echo "   git commit -m 'Update site'"
echo "   git push"
echo ""
