#!/bin/bash
# Script to regenerate pnpm-lock.yaml with pnpm 10.4.1
# This ensures compatibility with Railway's build environment

set -e

echo "Installing pnpm 10.4.1..."
npm install -g corepack@latest
corepack enable
corepack prepare pnpm@10.4.1 --activate

echo "Removing old lockfile..."
rm -f pnpm-lock.yaml

echo "Regenerating lockfile with pnpm 10.4.1..."
pnpm install --lockfile-only

echo "Lockfile regenerated successfully!"
echo "Please commit and push the updated pnpm-lock.yaml"
