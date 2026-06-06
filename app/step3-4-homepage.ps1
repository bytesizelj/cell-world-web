# ============================================================
#  Cell World - Homepage : Steps 3 + 4
#   3) Disable the active hot-deals pop-up (banner trigger),
#      keeping all markup for later reuse and keeping Celly working
#   4) Restore the 3 rotating hero background videos
#  Backup + idempotency guards + verification + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\step3-4-homepage.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\app\page.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

# ---------- Backup ----------
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

$content = [System.IO.File]::ReadAllText($file)

# ---------- Step 3: disable the hot-deals pop-up trigger ----------
if ($content.Contains('popup disabled - reuse later')) {
    Write-Host "  pop-up trigger already disabled - skipping" -ForegroundColor DarkYellow
}
elseif ($content.Contains('setShowBanner(true);')) {
    $content = $content.Replace('setShowBanner(true);', '// setShowBanner(true); // popup disabled - reuse later')
    Write-Host "  pop-up trigger disabled" -ForegroundColor Yellow
}
else {
    Write-Host "ABORT: could not find 'setShowBanner(true);'. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

# ---------- Step 4: restore hero video rotation ----------
$anchor = '  // Auto-rotate hot deals banner every 5 seconds'
$rotation = @'
  // Auto-rotate hero background videos every 8 seconds
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);

    return () => clearInterval(videoInterval);
  }, []);

'@

if ($content.Contains('Auto-rotate hero background videos')) {
    Write-Host "  hero rotation already present - skipping" -ForegroundColor DarkYellow
}
elseif ($content.Contains($anchor)) {
    $content = $content.Replace($anchor, $rotation + $anchor)
    Write-Host "  hero video rotation restored" -ForegroundColor Yellow
}
else {
    Write-Host "ABORT: could not find the rotation anchor. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('popup disabled - reuse later')) { $problems += "pop-up not disabled" }
if (-not $content.Contains('Auto-rotate hero background videos')) { $problems += "rotation not added" }
$rotCount = ([regex]::Matches($content, [regex]::Escape('setCurrentVideoIndex((prev)'))).Count
if ($rotCount -ne 1) { $problems += "expected 1 rotation call, found $rotCount" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

# ---------- Write ----------
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`nSUCCESS" -ForegroundColor Green
Write-Host "  Hot-deals pop-up: disabled (markup kept for reuse)" -ForegroundColor Green
Write-Host "  Hero videos: rotating bg -> bg2 -> bg3 every 8s" -ForegroundColor Green
Write-Host "  Celly: unaffected" -ForegroundColor Green
Write-Host "`nIf anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
