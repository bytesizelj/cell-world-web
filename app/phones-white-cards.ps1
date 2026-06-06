# ============================================================
#  Cell World - Phones Page : White Cards (remove black border)
#  Switches the dark tile/card/footer backgrounds to clean
#  white with dark text - removes the charcoal frame around
#  the product photos. 4 surgical edits.
#  Backup + idempotency + verify + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\phones-white-cards.ps1"
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

if ($content.Contains('bg-white p-2 overflow-hidden aspect-square')) {
    Write-Host "White cards already applied - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

$edits = @(
  @{ label='card bg';   old='bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg'; new='bg-white rounded-xl shadow-lg' },
  @{ label='image bg';  old='bg-gradient-to-br from-gray-800 to-gray-900 p-2 overflow-hidden aspect-square'; new='bg-white p-2 overflow-hidden aspect-square' },
  @{ label='footer bg'; old='<div className="p-3 bg-black/50">'; new='<div className="p-3 bg-white border-t border-gray-100">' },
  @{ label='name text'; old='text-base font-bold text-white truncate mb-2 text-center'; new='text-base font-bold text-gray-900 truncate mb-2 text-center' }
)

foreach ($e in $edits) {
    $cnt = ([regex]::Matches($content, [regex]::Escape($e.old))).Count
    if ($cnt -ne 1) {
        Write-Host "ABORT: '$($e.label)' anchor found $cnt times (expected 1). No changes made." -ForegroundColor Red
        Write-Host "(If 'image bg' failed, run phones-layout-rescale.ps1 first.)" -ForegroundColor DarkYellow
        Copy-Item -LiteralPath $backup -Destination $file -Force
        exit 1
    }
    $content = $content.Replace($e.old, $e.new)
    Write-Host "  edited: $($e.label)" -ForegroundColor Yellow
}

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('bg-white p-2 overflow-hidden aspect-square')) { $problems += "image bg not white" }
if ($content.Contains('from-gray-800 to-gray-900 p-2'))                   { $problems += "old image bg remains" }
if ($content.Contains('from-gray-900/50 to-gray-800/50'))                 { $problems += "old card bg remains" }
if (-not $content.Contains('text-gray-900 truncate mb-2 text-center'))    { $problems += "name text not darkened" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`nSUCCESS - phone cards are now clean white tiles" -ForegroundColor Green
Write-Host "  No more dark frame around the photos." -ForegroundColor Green
Write-Host "`nIf you don't like it, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
