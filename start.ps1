Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "               AQARFLOW - REAL ESTATE PLATFORM (PROJECT 01)" -ForegroundColor Yellow
Write-Host "                      A VIRELEO INITIATIVE (www.vireleo.me)" -ForegroundColor Green
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting AqarFlow Full-Stack Portal & Workspace..." -ForegroundColor White
Write-Host "  Public Discovery:   http://localhost:3000" -ForegroundColor Blue
Write-Host "  Business Workspace: http://localhost:3000/workspace" -ForegroundColor Blue
Write-Host "  API Health:         http://localhost:3000/api/v1/health" -ForegroundColor Blue
Write-Host ""
Write-Host "Demo Credentials:" -ForegroundColor White
Write-Host "  - Agency Admin: admin@aqarflow.com / Password123! (Salman Tariq)" -ForegroundColor Yellow
Write-Host "  - Senior Agent: ayesha@aqarflow.com / Password123! (Ayesha Khan)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Tip: 1-Click Role Switcher is available in both header bar and workspace sidebar!" -ForegroundColor Magenta
Write-Host "==============================================================================" -ForegroundColor Cyan

Set-Location -Path "$PSScriptRoot\frontend"
npm run dev
