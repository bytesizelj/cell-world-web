# ============================================================
#  Cell World - Phones Page : Card Layout Rescale
#  Image-forward square tiles. Removes the fixed 350px card
#  height (dead space), makes the image area a filling square,
#  and lets the info bar size to content.
#  3 surgical edits. Backup + idempotency + verify + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\phones-layout-rescale.ps1"
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

if ($content.Contains('aspect-square')) {
    Write-Host "Layout rescale already applied - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

# edits: @{ old; new; label }
$edits = @(
  @{ label='card height';  old="style={{ height: '350px', zIndex: 1 }}"; new="style={{ zIndex: 1 }}" },
  @{ label='image square'; old='<div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-3 overflow-hidden" style={{ height: ''260px'', position: ''relative'' }}>'; new='<div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 overflow-hidden aspect-square" style={{ position: ''relative'' }}>' },
  @{ label='info bar';     old='<div className="p-3 bg-black/50" style={{ height: ''90px'' }}>'; new='<div className="p-3 bg-black/50">' }
)

foreach ($e in $edits) {
    $cnt = ([regex]::Matches($content, [regex]::Escape($e.old))).Count
    if ($cnt -ne 1) {
        Write-Host "ABORT: '$($e.label)' anchor found $cnt times (expected 1). No changes made." -ForegroundColor Red
        Copy-Item -LiteralPath $backup -Destination $file -Force
        exit 1
    }
    $content = $content.Replace($e.old, $e.new)
    Write-Host "  edited: $($e.label)" -ForegroundColor Yellow
}

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('aspect-square'))      { $problems += "image square not applied" }
if ($content.Contains("height: '350px'"))         { $problems += "card height still fixed" }
if ($content.Contains("height: '260px'"))         { $problems += "image height still fixed" }
if ($content.Contains("height: '90px'"))          { $problems += "info bar height still fixed" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`nSUCCESS - phones grid rescaled (image-forward square tiles)" -ForegroundColor Green
Write-Host "  Mobile 2-up, desktop 3-up, images fill the tile, no dead space." -ForegroundColor Green
Write-Host "`nIf you don't like it, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
