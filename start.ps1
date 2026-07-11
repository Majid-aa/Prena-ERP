Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Prena ERP - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Building Docker images..." -ForegroundColor Yellow
docker compose build

Write-Host "`n[2/3] Starting services..." -ForegroundColor Yellow
docker compose up -d

Write-Host "`n[3/3] Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  Prena ERP is running!" -ForegroundColor Green
Write-Host "  Frontend: http://localhost" -ForegroundColor White
Write-Host "  API:      http://localhost:5000" -ForegroundColor White
Write-Host "  SQL:      localhost:1433" -ForegroundColor White
Write-Host "  Redis:    localhost:6379" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Green
