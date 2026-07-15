# update-out-of-stock-khadija.ps1
# Marks 11 items Back Soon (car accessories, mouse, storage, selfie sticks)
# and applies the 64GB->$70 / 128GB->$90 price reduction to storage items,
# in both:
#  - app/Categories/accessories-power/page.tsx (customer-facing display)
#  - lib/cellyRules.ts (Celly's CATALOG)

$ErrorActionPreference = "Stop"

$pageFile  = "C:\Users\ictcl\Projects\cell-world-web\app\Categories\accessories-power\page.tsx"
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
# 1) PAGE.TSX - block replacements (id line through the field being changed)
# ============================================================
$pageContent = Get-Content -Path $pageFile -Raw
$pageContent = $pageContent -replace "`r`n", "`n"

$pageReplacements = @(
    @{ Old = @'
  id: 'car-mp3-player-c15',
  name: 'C15 Car MP3 Player with RGB Lighting',
  image: '/images/Products/more/car-mp3-player-c15.png',
  price: 100.00,
  category: 'car-accessories',
  availability: 'In Stock',
'@; New = @'
  id: 'car-mp3-player-c15',
  name: 'C15 Car MP3 Player with RGB Lighting',
  image: '/images/Products/more/car-mp3-player-c15.png',
  price: 100.00,
  category: 'car-accessories',
  availability: 'Back Soon',
'@ }
    @{ Old = @'
  id: 'car-f2-transmitter',
  name: 'Car F2 FM Transmitter with Digital Display',
  image: '/images/Products/more/car-f2-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: "In Stock",
'@; New = @'
  id: 'car-f2-transmitter',
  name: 'Car F2 FM Transmitter with Digital Display',
  image: '/images/Products/more/car-f2-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'audiobox-fm-transmitter',
  name: 'AudioBox FM Transmitter',
  image: '/images/Products/more/audiobox-fm-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: "In Stock",
'@; New = @'
  id: 'audiobox-fm-transmitter',
  name: 'AudioBox FM Transmitter',
  image: '/images/Products/more/audiobox-fm-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'yesido-audio-adapter',
  name: 'Yesido Audio Adapter - Transmitter & Receiver',
  image: '/images/Products/more/yesido-audio-adapter.png',
  price: 60.00,
  category: 'car-accessories',
  availability: "In Stock",
'@; New = @'
  id: 'yesido-audio-adapter',
  name: 'Yesido Audio Adapter - Transmitter & Receiver',
  image: '/images/Products/more/yesido-audio-adapter.png',
  price: 60.00,
  category: 'car-accessories',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'philips-m344-mouse',
  name: 'Philips M344 Wireless Mouse',
  image: '/images/Products/more/philips-m344-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: "In Stock",
'@; New = @'
  id: 'philips-m344-mouse',
  name: 'Philips M344 Wireless Mouse',
  image: '/images/Products/more/philips-m344-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'philips-m413-mouse',
  name: 'Philips M413 Wireless Mouse',
  image: '/images/Products/more/philips-m413-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: "In Stock",
'@; New = @'
  id: 'philips-m413-mouse',
  name: 'Philips M413 Wireless Mouse',
  image: '/images/Products/more/philips-m413-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'sandisk-16gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 16GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-16gb.png',
  price: 50.00,
  category: 'storage',
  availability: 'In Stock',
'@; New = @'
  id: 'sandisk-16gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 16GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-16gb.png',
  price: 50.00,
  category: 'storage',
  availability: 'Back Soon',
'@ }
    @{ Old = @'
  id: 'adata-32gb',
  name: 'ADATA USB 3.2 Flash Drive - 32GB',
  image: '/images/Products/more/adata-usb-3.2-flash-drive-32gb.png',
  price: 80.00,
  category: 'storage',
  availability: 'In Stock',
'@; New = @'
  id: 'adata-32gb',
  name: 'ADATA USB 3.2 Flash Drive - 32GB',
  image: '/images/Products/more/adata-usb-3.2-flash-drive-32gb.png',
  price: 80.00,
  category: 'storage',
  availability: 'Back Soon',
'@ }
    @{ Old = @'
  id: 'sandisk-dual-64gb',
  name: 'SanDisk Ultra Dual Drive Go USB 3.1 - 64GB',
  image: '/images/Products/more/sandisk-ultra-dual-drive-go-usb-3.1-4gb.png',
  price: 100.00,
  category: 'storage',
  availability: "In Stock",
'@; New = @'
  id: 'sandisk-dual-64gb',
  name: 'SanDisk Ultra Dual Drive Go USB 3.1 - 64GB',
  image: '/images/Products/more/sandisk-ultra-dual-drive-go-usb-3.1-4gb.png',
  price: 70.00,
  category: 'storage',
  availability: "Back Soon",
'@ }
    @{ Old = @'
  id: 'smart-m2-pro-selfie-stick',
  name: 'Smart M2 Pro Selfie Stick',
  image: '/images/Products/accessories-power/smart-m2-pro.png',
  price: 250.00,
  category: 'selfie-sticks',
  inStock: true,
'@; New = @'
  id: 'smart-m2-pro-selfie-stick',
  name: 'Smart M2 Pro Selfie Stick',
  image: '/images/Products/accessories-power/smart-m2-pro.png',
  price: 250.00,
  category: 'selfie-sticks',
  inStock: false,
  availability: 'Back Soon',
'@ }
    @{ Old = @'
  id: 'r16k-selfie-stick',
  name: 'R16K Selfie Stick with Grip Handle & Tripod',
  image: '/images/Products/accessories-power/r16k-selfie.png',
  price: 75.00,
  category: 'selfie-sticks',
  inStock: true,
'@; New = @'
  id: 'r16k-selfie-stick',
  name: 'R16K Selfie Stick with Grip Handle & Tripod',
  image: '/images/Products/accessories-power/r16k-selfie.png',
  price: 75.00,
  category: 'selfie-sticks',
  inStock: false,
  availability: 'Back Soon',
'@ }
    @{ Old = @'
  id: 'sandisk-64gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 64GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-64gb.png',
  price: 100.00,
'@; New = @'
  id: 'sandisk-64gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 64GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-64gb.png',
  price: 70.00,
'@ }
    @{ Old = @'
  id: 'memory-card-64gb',
  name: 'SanDisk Ultra Memory Card - 64GB',
  image: '/images/Products/more/sandisk-ultra memory-card-64gb.png',
  price: 100.00,
'@; New = @'
  id: 'memory-card-64gb',
  name: 'SanDisk Ultra Memory Card - 64GB',
  image: '/images/Products/more/sandisk-ultra memory-card-64gb.png',
  price: 70.00,
'@ }
    @{ Old = @'
  id: 'sandisk-128gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 128GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-128gb.png',
  price: 120.00,
'@; New = @'
  id: 'sandisk-128gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 128GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-128gb.png',
  price: 90.00,
'@ }
    @{ Old = @'
  id: 'memory-card-128gb',
  name: 'SanDisk Ultra Memory Card - 128GB',
  image: '/images/Products/more/sandisk-ultra-memory-card-128gb.png',
  price: 120.00,
'@; New = @'
  id: 'memory-card-128gb',
  name: 'SanDisk Ultra Memory Card - 128GB',
  image: '/images/Products/more/sandisk-ultra-memory-card-128gb.png',
  price: 90.00,
'@ }
)

$pageApplied = 0
$pageSkipped = @()
foreach ($r in $pageReplacements) {
    $old = $r.Old -replace "`r`n", "`n"
    $new = $r.New -replace "`r`n", "`n"
    $count = ([regex]::Matches($pageContent, [regex]::Escape($old))).Count
    if ($count -eq 1) {
        $pageContent = $pageContent.Replace($old, $new)
        $pageApplied++
    } elseif ($count -eq 0) {
        $pageSkipped += "NOT FOUND: " + ($old -split "`n")[0]
    } else {
        $pageSkipped += "NOT UNIQUE ($count matches): " + ($old -split "`n")[0]
    }
}

# ============================================================
# 2) CELLYRULES.TS - single-line replacements
# ============================================================
$cellyContent = Get-Content -Path $cellyFile -Raw
$cellyContent = $cellyContent -replace "`r`n", "`n"

$cellyReplacements = @(
    @{ Old = "{ n: 'C15 Car MP3 Player (RGB)', p: 100, c: 'car-accessories' },"; New = "{ n: 'C15 Car MP3 Player (RGB)', p: 100, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Car F2 FM Transmitter', p: 100, c: 'car-accessories' },"; New = "{ n: 'Car F2 FM Transmitter', p: 100, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'AudioBox FM Transmitter', p: 100, c: 'car-accessories' },"; New = "{ n: 'AudioBox FM Transmitter', p: 100, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Yesido Audio Adapter', p: 60, c: 'car-accessories' },"; New = "{ n: 'Yesido Audio Adapter', p: 60, c: 'car-accessories', s: true }," }
    @{ Old = "{ n: 'Philips M344 Wireless Mouse', p: 75, c: 'mouse' },"; New = "{ n: 'Philips M344 Wireless Mouse', p: 75, c: 'mouse', s: true }," }
    @{ Old = "{ n: 'Philips M413 Wireless Mouse', p: 75, c: 'mouse' },"; New = "{ n: 'Philips M413 Wireless Mouse', p: 75, c: 'mouse', s: true }," }
    @{ Old = "{ n: 'SanDisk Cruzer 16GB', p: 50, c: 'storage' },"; New = "{ n: 'SanDisk Cruzer 16GB', p: 50, c: 'storage', s: true }," }
    @{ Old = "{ n: 'ADATA USB 3.2 32GB', p: 80, c: 'storage' },"; New = "{ n: 'ADATA USB 3.2 32GB', p: 80, c: 'storage', s: true }," }
    @{ Old = "{ n: 'SanDisk Ultra Dual Drive 64GB', p: 100, c: 'storage' },"; New = "{ n: 'SanDisk Ultra Dual Drive 64GB', p: 70, c: 'storage', s: true }," }
    @{ Old = "{ n: 'Smart M2 Pro Selfie Stick', p: 250, c: 'selfie' },"; New = "{ n: 'Smart M2 Pro Selfie Stick', p: 250, c: 'selfie', s: true }," }
    @{ Old = "{ n: 'R16K Selfie Stick with Tripod', p: 75, c: 'selfie' },"; New = "{ n: 'R16K Selfie Stick with Tripod', p: 75, c: 'selfie', s: true }," }
    @{ Old = "{ n: 'SanDisk Cruzer 64GB', p: 100, c: 'storage' },"; New = "{ n: 'SanDisk Cruzer 64GB', p: 70, c: 'storage' }," }
    @{ Old = "{ n: 'SanDisk Memory Card 64GB', p: 100, c: 'storage' },"; New = "{ n: 'SanDisk Memory Card 64GB', p: 70, c: 'storage' }," }
    @{ Old = "{ n: 'SanDisk Cruzer 128GB', p: 120, c: 'storage' },"; New = "{ n: 'SanDisk Cruzer 128GB', p: 90, c: 'storage' }," }
    @{ Old = "{ n: 'SanDisk Memory Card 128GB', p: 120, c: 'storage' },"; New = "{ n: 'SanDisk Memory Card 128GB', p: 90, c: 'storage' }," }
)

$cellyApplied = 0
$cellySkipped = @()
foreach ($r in $cellyReplacements) {
    $count = ([regex]::Matches($cellyContent, [regex]::Escape($r.Old))).Count
    if ($count -eq 1) {
        $cellyContent = $cellyContent.Replace($r.Old, $r.New)
        $cellyApplied++
    } elseif ($count -eq 0) {
        $cellySkipped += "NOT FOUND: $($r.Old)"
    } else {
        $cellySkipped += "NOT UNIQUE ($count matches): $($r.Old)"
    }
}

# ============================================================
# WRITE BOTH FILES - LF endings, UTF-8 no BOM
# ============================================================
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$pageContent = $pageContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($pageFile, $pageContent, $utf8NoBom)

$cellyContent = $cellyContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($cellyFile, $cellyContent, $utf8NoBom)

# ============================================================
# SUMMARY
# ============================================================
Write-Host ""
Write-Host "=== page.tsx: $pageApplied of $($pageReplacements.Count) applied ===" -ForegroundColor Green
if ($pageSkipped.Count -gt 0) {
    Write-Host "NEEDS REVIEW:" -ForegroundColor Yellow
    foreach ($s in $pageSkipped) { Write-Host "  $s" -ForegroundColor Yellow }
}

Write-Host ""
Write-Host "=== cellyRules.ts: $cellyApplied of $($cellyReplacements.Count) applied ===" -ForegroundColor Green
if ($cellySkipped.Count -gt 0) {
    Write-Host "NEEDS REVIEW:" -ForegroundColor Yellow
    foreach ($s in $cellySkipped) { Write-Host "  $s" -ForegroundColor Yellow }
}

Write-Host ""
Write-Host "Rollback commands if needed:" -ForegroundColor Cyan
Write-Host "Copy-Item `"$pageBackup`" `"$pageFile`" -Force"
Write-Host "Copy-Item `"$cellyBackup`" `"$cellyFile`" -Force"
