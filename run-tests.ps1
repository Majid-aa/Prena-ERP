# Prena Test Automation Script
# اجرای خودکار تمام تست‌ها با گزارش

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Prena Test Suite - Automated Testing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean
Write-Host "[1/4] Cleaning..." -ForegroundColor Yellow
dotnet clean -q

# Step 2: Build
Write-Host "[2/4] Building..." -ForegroundColor Yellow
dotnet build -q

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Fix errors first." -ForegroundColor Red
    exit 1
}

# Step 3: Unit Tests
Write-Host "[3/4] Running Unit Tests..." -ForegroundColor Yellow
dotnet test --no-build -v minimal --logger "console;verbosity=detailed" 2>&1 | Select-String -Pattern "Passed|Failed|Skipped|Test summary"

# Step 4: Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test Execution Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
