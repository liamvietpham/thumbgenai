#!/usr/bin/env bash
set -euo pipefail

# Vercel behavior:
# - exit 0: ignore build
# - exit 1: run build

PROJECT_NAME="@thumbgen-ai/web"

BASE="${VERCEL_GIT_PREVIOUS_SHA:-}"
HEAD="${VERCEL_GIT_COMMIT_SHA:-HEAD}"

if [ -z "$BASE" ]; then
  echo "No previous SHA found; run build."
  exit 1
fi

AFFECTED="$(npx nx show projects --affected --base="$BASE" --head="$HEAD" || true)"

if echo "$AFFECTED" | tr ' ' '\n' | grep -qx "$PROJECT_NAME"; then
  echo "$PROJECT_NAME affected; run build."
  exit 1
fi

echo "$PROJECT_NAME not affected; ignore build."
exit 0
