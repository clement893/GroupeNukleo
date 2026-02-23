# Script to regenerate pnpm-lock.yaml with pnpm 10.4.1 using npx
# This ensures compatibility with Railway's build environment

Write-Host "Regenerating lockfile with pnpm 10.4.1..." -ForegroundColor Green

# Remove old lockfile
Write-Host "Removing old lockfile..." -ForegroundColor Yellow
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue

# Use npx to run pnpm 10.4.1
Write-Host "Installing dependencies with pnpm 10.4.1..." -ForegroundColor Green
npx --yes pnpm@10.4.1 install --lockfile-only

if ($LASTEXITCODE -eq 0) {
    Write-Host "Lockfile regenerated successfully!" -ForegroundColor Green
    Write-Host "Please commit and push the updated pnpm-lock.yaml" -ForegroundColor Yellow
} else {
    Write-Host "Failed to regenerate lockfile" -ForegroundColor Red
    exit 1
}
