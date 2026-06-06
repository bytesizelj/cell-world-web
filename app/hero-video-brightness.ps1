# ============================================================
#  Cell World - Homepage : Hero Video Brightness
#  Adds a CSS filter to the rotating hero <video> elements so
#  the clips look brighter / more vibrant (fixes the "dull" look).
#  Backup + idempotency guard + verification + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\hero-video-brightness.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\app\page.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

$content = [System.IO.File]::ReadAllText($file)

$anchor = 'opacity: currentVideoIndex === index ? 1 : 0,'
$filter = "filter: 'brightness(1.2) saturate(1.2) contrast(1.05)',`n              "

if ($content.Contains("filter: 'brightness(1.2) saturate(1.2) contrast(1.05)'")) {
    Write-Host "Brightness filter already present - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

$anchorCount = ([regex]::Matches($content, [regex]::Escape($anchor))).Count
if ($anchorCount -ne 1) {
    Write-Host "ABORT: expected 1 hero-video opacity line, found $anchorCount. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

$content = $content.Replace($anchor, $filter + $anchor)

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains("filter: 'brightness(1.2) saturate(1.2) contrast(1.05)'")) { $problems += "filter not added" }
if (([regex]::Matches($content, [regex]::Escape($anchor))).Count -ne 1) { $problems += "opacity line count changed" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - hero videos brightened" -ForegroundColor Green
Write-Host "  filter: brightness(1.2) saturate(1.2) contrast(1.05)" -ForegroundColor Green
Write-Host "`nTune the look by editing those 3 numbers (1.0 = no change)." -ForegroundColor Cyan
Write-Host "If anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
