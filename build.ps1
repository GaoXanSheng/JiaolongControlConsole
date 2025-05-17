# UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "===== Entering JiaoLongWMI directory ====="
Push-Location "JiaoLongWMI"

Write-Host "===== Running build.ps1 script ====="
try {
    & .\build.ps1
} catch {
    Write-Host "[Error] Failed to run build.ps1 script!"
    Pause
    exit 1
}

Write-Host "===== Returning to parent directory ====="
Pop-Location

Write-Host "===== Running npm install ====="
try {
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "npm install failed"
    }
} catch {
    Write-Host "[Error] npm install failed!"
    Pause
    exit 1
}

Write-Host "===== Running npm run build:unpack ====="
try {
    npm run build:unpack
    if ($LASTEXITCODE -ne 0) {
        throw "npm run build:unpack failed"
    }
} catch {
    Write-Host "[Error] npm run build:unpack failed!"
    Pause
    exit 1
}

Write-Host "===== All tasks completed successfully ====="
Pause
