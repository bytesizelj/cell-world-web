# update-email-address.ps1
# Replaces musicworld@vincysurf.com with info@cellworldsvg.com in:
#  - app/contact/page.tsx
#  - components/CellyAssistant.tsx

$ErrorActionPreference = "Stop"

$files = @(
    "C:\Users\ictcl\Projects\cell-world-web\app\contact\page.tsx",
    "C:\Users\ictcl\Projects\cell-world-web\components\CellyAssistant.tsx"
)

foreach ($f in $files) {
    if (-not (Test-Path $f)) {
        Write-Host "ERROR: File not found at $f" -ForegroundColor Red
        exit 1
    }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$OLD = "musicworld@vincysurf.com"
$NEW = "info@cellworldsvg.com"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$totalReplaced = 0
$backups = @()

Write-Host "Backups created:" -ForegroundColor Cyan

foreach ($file in $files) {
    # Timestamped backup
    $backup = "$file.bak-$timestamp"
    Copy-Item $file $backup
    $backups += @{ Backup = $backup; Original = $file }
    Write-Host "  $backup"

    # Read, normalize line endings
    $content = Get-Content -Path $file -Raw
    $content = $content -replace "`r`n", "`n"

    # Count occurrences before replacing
    $count = ([regex]::Matches($content, [regex]::Escape($OLD))).Count

    if ($count -eq 0) {
        Write-Host "  (no occurrences found in $(Split-Path $file -Leaf) - skipped)" -ForegroundColor Yellow
        continue
    }

    $content = $content.Replace($OLD, $NEW)

    # Write back - LF endings, UTF-8 no BOM
    [System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

    $totalReplaced += $count
    Write-Host "  Replaced $count occurrence(s) in $(Split-Path $file -Leaf)" -ForegroundColor Green
}

# ============================================================
# VERIFICATION
# ============================================================
Write-Host ""
Write-Host "=== VERIFICATION ===" -ForegroundColor Green
Write-Host "Total replacements: $totalReplaced" -ForegroundColor Green
Write-Host ""

$remaining = 0
foreach ($file in $files) {
    $verify = Get-Content -Path $file -Raw
    $oldLeft = ([regex]::Matches($verify, [regex]::Escape($OLD))).Count
    $newFound = ([regex]::Matches($verify, [regex]::Escape($NEW))).Count
    $name = Split-Path $file -Leaf

    if ($oldLeft -eq 0) {
        Write-Host "  OK       $name - old address gone, $newFound new address present" -ForegroundColor Green
    } else {
        Write-Host "  WARNING  $name - $oldLeft occurrence(s) of old address remain" -ForegroundColor Red
        $remaining += $oldLeft
    }
}

# Project-wide sweep to catch anything missed
Write-Host ""
Write-Host "=== PROJECT-WIDE CHECK ===" -ForegroundColor Green
$sweep = Get-ChildItem -Path "C:\Users\ictcl\Projects\cell-world-web" -Recurse -Include *.tsx,*.ts,*.json,*.md -Exclude *.bak-* -ErrorAction SilentlyContinue |
         Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
         Select-String -Pattern "vincysurf" -ErrorAction SilentlyContinue

if ($sweep) {
    Write-Host "Still found 'vincysurf' in:" -ForegroundColor Yellow
    $sweep | ForEach-Object { Write-Host "  $($_.Path) : line $($_.LineNumber)" -ForegroundColor Yellow }
} else {
    Write-Host "  Clean - no 'vincysurf' references remain anywhere in the project." -ForegroundColor Green
}

Write-Host ""
Write-Host "Rollback commands if needed:" -ForegroundColor Cyan
foreach ($b in $backups) {
    Write-Host "Copy-Item `"$($b.Backup)`" `"$($b.Original)`" -Force"
}
