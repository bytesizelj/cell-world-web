# add-speakers-watches-tech-audio.ps1
# Adds 4 new speakers and 5 new watches to:
#  - app/Categories/tech-audio/page.tsx (customer-facing display)
#  - lib/cellyRules.ts (Celly's CATALOG)

$ErrorActionPreference = "Stop"

$pageFile  = "C:\Users\ictcl\Projects\cell-world-web\app\Categories\tech-audio\page.tsx"
$cellyFile = "C:\Users\ictcl\Projects\cell-world-web\lib\cellyRules.ts"

foreach ($f in @($pageFile, $cellyFile)) {
    if (-not (Test-Path $f)) {
        Write-Host "ERROR: File not found at $f" -ForegroundColor Red
        exit 1
    }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# ---------- BACKUPS ----------
$pageBackup  = "$pageFile.bak-$timestamp"
$cellyBackup = "$cellyFile.bak-$timestamp"
Copy-Item $pageFile $pageBackup
Copy-Item $cellyFile $cellyBackup
Write-Host "Backups created:" -ForegroundColor Cyan
Write-Host "  $pageBackup"
Write-Host "  $cellyBackup"

# ============================================================
# 1) PAGE.TSX
# ============================================================
$pageContent = Get-Content -Path $pageFile -Raw
$pageContent = $pageContent -replace "`r`n", "`n"

# ---- Insert 4 speakers right before the first WATCHES item ----
$speakerAnchor = @'
{
  id: 'casio-analog-1500wh-1bv',
'@

$speakerNew = @'
{
  id: 'urbanista-brisbane-speaker',
  name: 'Urbanista Brisbane Portable Speaker',
  image: '/images/Products/tech-audio/urbanista-brisbane-speaker.png',
  price: 180.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    compatibility: 'Android and iOS',
    connectivity: 'Bluetooth',
    type: 'Portable Speaker'
  }
},
{
  id: 'braven-hd-bluetooth-speaker',
  name: 'Braven HD Bluetooth Speaker',
  image: '/images/Products/tech-audio/braven-hd-bluetooth-speaker.png',
  price: 150.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    battery: '2100mAh Battery',
    range: 'Bluetooth up to 33 feet',
    mics: 'Dual Mics for Clear Calls',
    design: 'Slim, Portable Power Bank Function'
  }
},
{
  id: 'rca-zylopulse-flame-party-speaker',
  name: 'RCA ZyloPulse Flame Party Speaker',
  image: '/images/Products/tech-audio/rca-zylopulse-flame-party-speaker.png',
  price: 260.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    lighting: 'Flame Effect Lights, Disco Lights',
    modes: 'Karaoke Mode',
    inputs: 'Mic Port, Aux Port, Memory Devices',
    features: 'Bluetooth Wireless, FM Radio, High Fidelity Speaker',
    includes: 'Microphone Included'
  }
},
{
  id: 'rca-lumi-core-led-sound-blaster',
  name: 'RCA LUMI CORE LED Sound Blaster',
  image: '/images/Products/tech-audio/rca-lumi-core-led-sound-blaster.png',
  price: 165.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    lighting: '7 Vibrant Light Modes, LED Color Flame Effect',
    modes: 'Karaoke Mode',
    inputs: 'Aux Port, Memory Devices Input',
    features: 'Extra Bass, Bluetooth Wireless, FM Radio'
  }
},
{
  id: 'casio-analog-1500wh-1bv',
'@

# ---- Insert 5 watches right before the first EARPODS item ----
$watchAnchor = @'
  {
  id: 'apple-usb-c-earphone',
'@

$watchNew = @'
{
  id: 'smartwatch-waterproof-199',
  name: 'Smart Watch - Waterproof ($199)',
  image: '/images/Products/tech-audio/smartwatch-waterproof-199.png',
  price: 199.00,
  category: 'watches',
  availability: 'In Stock',
  specs: {
    waterproof: 'Waterproof',
    display: 'Digital Display',
    buttons: 'Power & Menu Buttons'
  }
},
{
  id: 'smartwatch-waterproof-230',
  name: 'Smart Watch - Waterproof ($230)',
  image: '/images/Products/tech-audio/smartwatch-waterproof-230.png',
  price: 230.00,
  category: 'watches',
  availability: 'In Stock',
  specs: {
    waterproof: 'Waterproof',
    display: 'Digital Display'
  }
},
{
  id: 'watch-ultra-7',
  name: 'Watch Ultra 7',
  image: '/images/Products/tech-audio/watch-ultra-7.png',
  price: 160.00,
  category: 'watches',
  availability: 'In Stock',
  specs: {
    display: 'Digital Display with Compass & Weather',
    features: 'Heart Rate, Step Counter',
    strap: 'Silicone Band'
  }
},
{
  id: 'peje-gps-smartwatch',
  name: 'PEJE GPS Smart Watch',
  image: '/images/Products/tech-audio/peje-gps-smartwatch.png',
  price: 200.00,
  category: 'watches',
  availability: 'In Stock',
  specs: {
    display: '1.39" Display',
    gps: 'Built-in GPS',
    waterproof: '1ATM Water Resistant',
    battery: '7 Days Working'
  }
},
{
  id: 'js-watch-7-mini-smartwatch',
  name: 'JS Watch 7 Mini Smart Watch',
  image: '/images/Products/tech-audio/js-watch-7-mini-smartwatch.png',
  price: 150.00,
  category: 'watches',
  availability: 'In Stock',
  specs: {
    type: 'Smart Watch',
    size: 'Mini'
  }
},
  {
  id: 'apple-usb-c-earphone',
'@

$speakerAnchor = $speakerAnchor -replace "`r`n", "`n"
$speakerNew    = $speakerNew -replace "`r`n", "`n"
$watchAnchor   = $watchAnchor -replace "`r`n", "`n"
$watchNew      = $watchNew -replace "`r`n", "`n"

$speakerCount = ([regex]::Matches($pageContent, [regex]::Escape($speakerAnchor))).Count
$watchCount   = ([regex]::Matches($pageContent, [regex]::Escape($watchAnchor))).Count

if ($speakerCount -ne 1) {
    Write-Host "ERROR: speaker anchor matched $speakerCount times (expected 1). No changes written to page.tsx." -ForegroundColor Red
    exit 1
}
if ($watchCount -ne 1) {
    Write-Host "ERROR: watch anchor matched $watchCount times (expected 1). No changes written to page.tsx." -ForegroundColor Red
    exit 1
}

$pageContent = $pageContent.Replace($speakerAnchor, $speakerNew)
$pageContent = $pageContent.Replace($watchAnchor, $watchNew)

# ============================================================
# 2) CELLYRULES.TS
# ============================================================
$cellyContent = Get-Content -Path $cellyFile -Raw
$cellyContent = $cellyContent -replace "`r`n", "`n"

$cellySpeakerAnchor = "{ n: 'Fugoo Tough', p: 200, c: 'speakers', s: true },"
$cellySpeakerNew = @"
{ n: 'Fugoo Tough', p: 200, c: 'speakers', s: true },
  { n: 'Urbanista Brisbane Portable Speaker', p: 180, c: 'speakers' },
  { n: 'Braven HD Bluetooth Speaker', p: 150, c: 'speakers' },
  { n: 'RCA ZyloPulse Flame Party Speaker', p: 260, c: 'speakers' },
  { n: 'RCA LUMI CORE LED Sound Blaster', p: 165, c: 'speakers' },
"@

$cellyWatchAnchor = "{ n: 'Casio AEQ-110W World Time', p: 250, c: 'watches', s: true },"
$cellyWatchNew = @"
{ n: 'Casio AEQ-110W World Time', p: 250, c: 'watches', s: true },
  { n: 'Smart Watch - Waterproof (`$199)', p: 199, c: 'watches' },
  { n: 'Smart Watch - Waterproof (`$230)', p: 230, c: 'watches' },
  { n: 'Watch Ultra 7', p: 160, c: 'watches' },
  { n: 'PEJE GPS Smart Watch', p: 200, c: 'watches' },
  { n: 'JS Watch 7 Mini Smart Watch', p: 150, c: 'watches' },
"@

$cellySpeakerNew = $cellySpeakerNew -replace "`r`n", "`n"
$cellyWatchNew   = $cellyWatchNew -replace "`r`n", "`n"

$cellySpeakerCount = ([regex]::Matches($cellyContent, [regex]::Escape($cellySpeakerAnchor))).Count
$cellyWatchCount   = ([regex]::Matches($cellyContent, [regex]::Escape($cellyWatchAnchor))).Count

if ($cellySpeakerCount -ne 1) {
    Write-Host "ERROR: celly speaker anchor matched $cellySpeakerCount times (expected 1). No changes written to cellyRules.ts." -ForegroundColor Red
    exit 1
}
if ($cellyWatchCount -ne 1) {
    Write-Host "ERROR: celly watch anchor matched $cellyWatchCount times (expected 1). No changes written to cellyRules.ts." -ForegroundColor Red
    exit 1
}

$cellyContent = $cellyContent.Replace($cellySpeakerAnchor, $cellySpeakerNew)
$cellyContent = $cellyContent.Replace($cellyWatchAnchor, $cellyWatchNew)

# ============================================================
# WRITE BOTH FILES - LF endings, UTF-8 no BOM
# ============================================================
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$pageContent = $pageContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($pageFile, $pageContent, $utf8NoBom)

$cellyContent = $cellyContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($cellyFile, $cellyContent, $utf8NoBom)

# ============================================================
# VERIFICATION
# ============================================================
$verifyPage  = Get-Content -Path $pageFile -Raw
$verifyCelly = Get-Content -Path $cellyFile -Raw

$newIds = @(
    'urbanista-brisbane-speaker', 'braven-hd-bluetooth-speaker', 'rca-zylopulse-flame-party-speaker', 'rca-lumi-core-led-sound-blaster',
    'smartwatch-waterproof-199', 'smartwatch-waterproof-230', 'watch-ultra-7', 'peje-gps-smartwatch', 'js-watch-7-mini-smartwatch'
)
$newCatalogNames = @(
    'Urbanista Brisbane Portable Speaker', 'Braven HD Bluetooth Speaker', 'RCA ZyloPulse Flame Party Speaker', 'RCA LUMI CORE LED Sound Blaster',
    'Smart Watch - Waterproof ($199)', 'Smart Watch - Waterproof ($230)', 'Watch Ultra 7', 'PEJE GPS Smart Watch', 'JS Watch 7 Mini Smart Watch'
)

Write-Host ""
Write-Host "=== VERIFICATION: page.tsx ===" -ForegroundColor Green
foreach ($id in $newIds) {
    if ($verifyPage -match [regex]::Escape("id: '$id'")) { Write-Host "  OK       $id" -ForegroundColor Green }
    else { Write-Host "  MISSING  $id" -ForegroundColor Red }
}

Write-Host ""
Write-Host "=== VERIFICATION: cellyRules.ts ===" -ForegroundColor Green
foreach ($name in $newCatalogNames) {
    if ($verifyCelly -match [regex]::Escape("n: '$name'")) { Write-Host "  OK       $name" -ForegroundColor Green }
    else { Write-Host "  MISSING  $name" -ForegroundColor Red }
}

Write-Host ""
Write-Host "Reminder: images must exist in /public/images/Products/tech-audio/ with the exact filenames given earlier." -ForegroundColor Yellow

Write-Host ""
Write-Host "Rollback commands if needed:" -ForegroundColor Cyan
Write-Host "Copy-Item `"$pageBackup`" `"$pageFile`" -Force"
Write-Host "Copy-Item `"$cellyBackup`" `"$cellyFile`" -Force"
