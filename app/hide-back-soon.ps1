# ============================================================
#  Cell World - Phones Page : Hide "Back Soon" items
#  Filters out availability === 'Back Soon' so only in-stock
#  phones render in the grid (owner preference - they return
#  when restocked). Fully reversible.
#  Backup + idempotency + verification + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\hide-back-soon.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\app\Categories\phones\page.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

$content = [System.IO.File]::ReadAllText($file)

if ($content.Contains('visibleProducts')) {
    Write-Host "Already hiding Back Soon items - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

$pattern = "const filteredProducts = filterCategory === 'all'[\s\S]*?products\.filter\(p => p\.category === filterCategory\);"
$repl = @'
const visibleProducts = products.filter(p => p.availability !== 'Back Soon');
  const filteredProducts = filterCategory === 'all'
    ? visibleProducts
    : visibleProducts.filter(p => p.category === filterCategory);
'@

$before = $content
$content = [regex]::Replace($content, $pattern, $repl)

if ($content -eq $before) {
    Write-Host "ABORT: could not find the filteredProducts block. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('visibleProducts')) { $problems += "visibleProducts not added" }
if (-not $content.Contains("p.availability !== 'Back Soon'")) { $problems += "Back Soon filter missing" }
if (([regex]::Matches($content, [regex]::Escape('const filteredProducts ='))).Count -ne 1) { $problems += "filteredProducts count off" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - Back Soon phones are now hidden from the grid" -ForegroundColor Green
Write-Host "  Only in-stock items render. Badge code left intact (dormant)." -ForegroundColor Green
Write-Host "`nTo SHOW them again later, just roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
