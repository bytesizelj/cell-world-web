# sync-celly-stock.ps1
# Adds missing `s: true` flags to lib/cellyRules.ts CATALOG entries
# for items marked "Back Soon" on the live category pages but not yet
# flagged as sold-out/back-soon in Celly's brain.

$ErrorActionPreference = "Stop"

$targetFile = "C:\Users\ictcl\Projects\cell-world-web\lib\cellyRules.ts"

if (-not (Test-Path $targetFile)) {
    Write-Host "ERROR: File not found at $targetFile" -ForegroundColor Red
    exit 1
}

# Timestamped backup
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupFile = "$targetFile.bak-$timestamp"
Copy-Item $targetFile $backupFile
Write-Host "Backup created: $backupFile" -ForegroundColor Cyan

# Read file content (raw, preserve everything)
$content = Get-Content -Path $targetFile -Raw

# Exact old-line -> new-line pairs. Each old line must appear EXACTLY once.
$replacements = @(
    @{ Old = "{ n: 'Xbox Controller (Pulse Red)', p: 350, c: 'gaming' },"; New = "{ n: 'Xbox Controller (Pulse Red)', p: 350, c: 'gaming', s: true }," }
    @{ Old = "{ n: 'Razer PS5 Quick Charging Stand', p: 399, c: 'gaming' },"; New = "{ n: 'Razer PS5 Quick Charging Stand', p: 399, c: 'gaming', s: true }," }
    @{ Old = "{ n: 'RCA BeatBox', p: 200, c: 'speakers' },"; New = "{ n: 'RCA BeatBox', p: 200, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'RCA Shock-Wave', p: 380, c: 'speakers' },"; New = "{ n: 'RCA Shock-Wave', p: 380, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'RCA HoloSound', p: 599, c: 'speakers' },"; New = "{ n: 'RCA HoloSound', p: 599, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'Skull Candy STOMP', p: 950, c: 'speakers' },"; New = "{ n: 'Skull Candy STOMP', p: 950, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'JBL Flip 6', p: 499, c: 'speakers' },"; New = "{ n: 'JBL Flip 6', p: 499, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'JBL Boombox 3 (Camo)', p: 1800, c: 'speakers' },"; New = "{ n: 'JBL Boombox 3 (Camo)', p: 1800, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'JBL Xtreme 4', p: 1250, c: 'speakers' },"; New = "{ n: 'JBL Xtreme 4', p: 1250, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'Skull Candy Ounce', p: 160, c: 'speakers' },"; New = "{ n: 'Skull Candy Ounce', p: 160, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'Fugoo Tough', p: 200, c: 'speakers' },"; New = "{ n: 'Fugoo Tough', p: 200, c: 'speakers', s: true }," }
    @{ Old = "{ n: 'PEJE Smartwatch', p: 175, c: 'watches' },"; New = "{ n: 'PEJE Smartwatch', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'PEJE Classic Round', p: 175, c: 'watches' },"; New = "{ n: 'PEJE Classic Round', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'PEJE Sport Smartwatch', p: 175, c: 'watches' },"; New = "{ n: 'PEJE Sport Smartwatch', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'M900 Watch Pro', p: 175, c: 'watches' },"; New = "{ n: 'M900 Watch Pro', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'PEJE ZW Series 10', p: 175, c: 'watches' },"; New = "{ n: 'PEJE ZW Series 10', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'PEJE ZW Ultra X', p: 175, c: 'watches' },"; New = "{ n: 'PEJE ZW Ultra X', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'PEJE T800 Ultra 2 Max', p: 175, c: 'watches' },"; New = "{ n: 'PEJE T800 Ultra 2 Max', p: 175, c: 'watches', s: true }," }
    @{ Old = "{ n: 'Apple AirPods 3rd Generation', p: 650, c: 'earbuds' },"; New = "{ n: 'Apple AirPods 3rd Generation', p: 650, c: 'earbuds', s: true }," }
    @{ Old = "{ n: 'Premium Wireless Earbuds Pro (ANC)', p: 89, c: 'earbuds' },"; New = "{ n: 'Premium Wireless Earbuds Pro (ANC)', p: 89, c: 'earbuds', s: true }," }
    @{ Old = "{ n: 'Yesido TWS32 (ANC)', p: 140, c: 'earbuds' },"; New = "{ n: 'Yesido TWS32 (ANC)', p: 140, c: 'earbuds', s: true }," }
    @{ Old = "{ n: '2000 Series Wireless Headphones (Pink)', p: 150, c: 'earbuds' },"; New = "{ n: '2000 Series Wireless Headphones (Pink)', p: 150, c: 'earbuds', s: true }," }
    @{ Old = "{ n: 'Buds2 Pro', p: 120, c: 'earbuds' },"; New = "{ n: 'Buds2 Pro', p: 120, c: 'earbuds', s: true }," }
    @{ Old = "{ n: 'Dolphin MCX11 UHF Wireless Mic', p: 200, c: 'microphones' },"; New = "{ n: 'Dolphin MCX11 UHF Wireless Mic', p: 200, c: 'microphones', s: true }," }
    @{ Old = "{ n: 'StudioZ Wired & Wireless Mic', p: 80, c: 'microphones' },"; New = "{ n: 'StudioZ Wired & Wireless Mic', p: 80, c: 'microphones', s: true }," }
    @{ Old = "{ n: 'Audiopipe 2 Channel Guitar-Singer Console', p: 350, c: 'audio-interfaces' },"; New = "{ n: 'Audiopipe 2 Channel Guitar-Singer Console', p: 350, c: 'audio-interfaces', s: true }," }
    @{ Old = "{ n: 'Audiopipe 2 Channel Audio Interface', p: 450, c: 'audio-interfaces' },"; New = "{ n: 'Audiopipe 2 Channel Audio Interface', p: 450, c: 'audio-interfaces', s: true }," }
    @{ Old = "{ n: 'WaveMixer Bluetooth Multi-Channel Interface', p: 75, c: 'audio-interfaces' },"; New = "{ n: 'WaveMixer Bluetooth Multi-Channel Interface', p: 75, c: 'audio-interfaces', s: true }," }
    @{ Old = "{ n: 'Pioneer 4`" Speaker TS-F1034R', p: 155, c: 'car-audio' },"; New = "{ n: 'Pioneer 4`" Speaker TS-F1034R', p: 155, c: 'car-audio', s: true }," }
    @{ Old = "{ n: 'Pioneer 5 1/4`" 2-Way Speaker', p: 160, c: 'car-audio' },"; New = "{ n: 'Pioneer 5 1/4`" 2-Way Speaker', p: 160, c: 'car-audio', s: true }," }
    @{ Old = "{ n: 'Pioneer Dome Tweeter TS-S20', p: 300, c: 'car-audio' },"; New = "{ n: 'Pioneer Dome Tweeter TS-S20', p: 300, c: 'car-audio', s: true }," }
    @{ Old = "{ n: 'Samsung Super Fast Wireless Charger', p: 220, c: 'chargers' },"; New = "{ n: 'Samsung Super Fast Wireless Charger', p: 220, c: 'chargers', s: true }," }
    @{ Old = "{ n: 'Yesido Car Holder C267', p: 50, c: 'car-accessories' },"; New = "{ n: 'Yesido Car Holder C267', p: 50, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'RCA Car Holder', p: 60, c: 'car-accessories' },"; New = "{ n: 'RCA Car Holder', p: 60, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Yesido Car Holder C173', p: 60, c: 'car-accessories' },"; New = "{ n: 'Yesido Car Holder C173', p: 60, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Yesido Car Holder C261', p: 60, c: 'car-accessories' },"; New = "{ n: 'Yesido Car Holder C261', p: 60, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'HyperGear Universal Phone Holder', p: 80, c: 'car-accessories' },"; New = "{ n: 'HyperGear Universal Phone Holder', p: 80, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Pocket Juice Air Plus 10000mAh', p: 99, c: 'powerbanks' },"; New = "{ n: 'Pocket Juice Air Plus 10000mAh', p: 99, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'Anker PowerCore Select 10000mAh', p: 85, c: 'powerbanks' },"; New = "{ n: 'Anker PowerCore Select 10000mAh', p: 85, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'Anker Pocket-Sized 10000mAh', p: 75, c: 'powerbanks' },"; New = "{ n: 'Anker Pocket-Sized 10000mAh', p: 75, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'Yesido Wireless Power Bank (w/ cables)', p: 95, c: 'powerbanks' },"; New = "{ n: 'Yesido Wireless Power Bank (w/ cables)', p: 95, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'HyperGear PowerPack Mini 5000mAh', p: 99, c: 'powerbanks' },"; New = "{ n: 'HyperGear PowerPack Mini 5000mAh', p: 99, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'HyperGear ClearCharge XL 20000mAh', p: 180, c: 'powerbanks' },"; New = "{ n: 'HyperGear ClearCharge XL 20000mAh', p: 180, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'Pocket Juice Power Bank (Flashlight)', p: 100, c: 'powerbanks' },"; New = "{ n: 'Pocket Juice Power Bank (Flashlight)', p: 100, c: 'powerbanks', s: true }," }
    @{ Old = "{ n: 'YESIDO 4-in-1 Cable', p: 50, c: 'cables' },"; New = "{ n: 'YESIDO 4-in-1 Cable', p: 50, c: 'cables', s: true }," }
    @{ Old = "{ n: 'iPad 9th Generation', p: 1500, c: 'tablet' },"; New = "{ n: 'iPad 9th Generation', p: 1500, c: 'tablet', s: true }," }
    @{ Old = "{ n: 'Lenovo IdeaPad Slim 3', p: 1800, c: 'laptop' },"; New = "{ n: 'Lenovo IdeaPad Slim 3', p: 1800, c: 'laptop', s: true }," }
    @{ Old = "{ n: 'itel A90', p: 475, c: 'phone' },"; New = "{ n: 'itel A90', p: 475, c: 'phone', s: true }," }
)

$applied = 0
$skipped = @()

foreach ($r in $replacements) {
    $count = ([regex]::Matches($content, [regex]::Escape($r.Old))).Count
    if ($count -eq 1) {
        $content = $content.Replace($r.Old, $r.New)
        $applied++
    } elseif ($count -eq 0) {
        $skipped += "NOT FOUND (already fixed, or wording differs): $($r.Old)"
    } else {
        $skipped += "SKIPPED - matched $count times (not unique, check manually): $($r.Old)"
    }
}

# Normalize line endings to LF, write UTF-8 no BOM
$content = $content -replace "`r`n", "`n"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($targetFile, $content, $utf8NoBom)

# Post-write verification
$verify = Get-Content -Path $targetFile -Raw
$sTrueCount = ([regex]::Matches($verify, "s:\s*true")).Count

Write-Host ""
Write-Host "=== SYNC COMPLETE ===" -ForegroundColor Green
Write-Host "Lines updated: $applied of $($replacements.Count)" -ForegroundColor Green
Write-Host "Total 's: true' flags now in file: $sTrueCount" -ForegroundColor Green

if ($skipped.Count -gt 0) {
    Write-Host ""
    Write-Host "=== NEEDS MANUAL REVIEW ($($skipped.Count)) ===" -ForegroundColor Yellow
    foreach ($s in $skipped) { Write-Host $s -ForegroundColor Yellow }
}

Write-Host ""
Write-Host "Rollback command if needed:" -ForegroundColor Cyan
Write-Host "Copy-Item `"$backupFile`" `"$targetFile`" -Force" -ForegroundColor White
