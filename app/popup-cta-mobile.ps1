# ============================================================
#  Cell World - Homepage : Video Pop-up CTA mobile sizing
#  Makes the SHOP NOW button small on mobile, full size on md+,
#  and a touch lower so it stops covering the video.
#  Updates BOTH slides (earbuds + keyboard).
#  Backup + idempotency + verify (must change 2) + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\popup-cta-mobile.ps1"
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

$old = 'absolute bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-black text-lg shadow-2xl hover:scale-110 transition-all animate-pulse z-20'
$new = 'absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 text-xs md:px-8 md:py-3 md:text-lg rounded-full font-black shadow-2xl hover:scale-110 transition-all animate-pulse z-20'

if ($content.Contains($new)) {
    Write-Host "CTA already responsive - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

$count = ([regex]::Matches($content, [regex]::Escape($old))).Count
if ($count -ne 2) {
    Write-Host "ABORT: expected 2 CTA buttons to update, found $count. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

$content = $content.Replace($old, $new)

# ---------- Verify ----------
$problems = @()
$newCount = ([regex]::Matches($content, [regex]::Escape($new))).Count
if ($newCount -ne 2) { $problems += "expected 2 responsive CTAs, found $newCount" }
if ($content.Contains($old)) { $problems += "an old CTA still remains" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - SHOP NOW button is now mobile-friendly" -ForegroundColor Green
Write-Host "  Mobile: small (text-xs, px-4) | Desktop: full size (md:text-lg, md:px-8)" -ForegroundColor Green
Write-Host "`nIf anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
