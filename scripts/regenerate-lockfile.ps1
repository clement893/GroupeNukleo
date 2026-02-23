# PowerShell script to regenerate pnpm-lock.yaml with pnpm 10.4.1
# This ensures compatibility with Railway's build environment

Write-Host "Installing pnpm 10.4.1..." -ForegroundColor Green
npm install -g corepack@latest
corepack enable
corepack prepare pnpm@10.4.1 --activate

Write-Host "Removing old lockfile..." -ForegroundColor Yellow
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue

Write-Host "Regenerating lockfile with pnpm 10.4.1..." -ForegroundColor Green
pnpm install --lockfile-only

Write-Host "Lockfile regenerated successfully!" -ForegroundColor Green
Write-Host "Please commit and push the updated pnpm-lock.yaml" -ForegroundColor Yellow
