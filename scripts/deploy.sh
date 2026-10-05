#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (GitHub Pages, "deploy from branch").
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="$(git remote get-url origin)"
npm run build
touch dist/.nojekyll            # keep Jekyll from hiding the _astro/ folder
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Deploy $(git -C .. rev-parse --short HEAD) — $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q -f "$REMOTE" gh-pages
rm -rf .git
echo "Deployed → https://angelicojohn.github.io/angelico-portfolio/"
