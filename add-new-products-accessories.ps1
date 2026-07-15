# add-new-products-accessories.ps1
# Adds 9 new products (selfie sticks, ring lights, battery packs) to:
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
# 1) PAGE.TSX - insert 9 product cards before the closing array bracket
# ============================================================
$pageContent = Get-Content -Path $pageFile -Raw
$pageContent = $pageContent -replace "`r`n", "`n"

$pageAnchor = @"
    type: 'Memory Card'
  }
},
  ];
"@

$newProductBlocks = @"
    type: 'Memory Card'
  }
},

// SELFIE STICKS & RING LIGHTS - New arrivals
{
  id: 'tt22-mini-selfie-stick',
  name: 'TT22 Mini Selfie Stick',
  image: '/images/Products/accessories-power/tt22-mini-selfie-stick.png',
  price: 100.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    type: 'Mini Selfie Stick',
    features: 'Compact, Portable'
  }
},
{
  id: 'f07-mini-selfie-stick',
  name: 'F07 Mini Selfie Stick',
  image: '/images/Products/accessories-power/f07-mini-selfie-stick.png',
  price: 80.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    type: 'Mini Selfie Stick',
    features: 'Compact, Portable'
  }
},
{
  id: 'jc32-2in1-selfie-stick',
  name: 'JC-32 2-in-1 Selfie Stick',
  image: '/images/Products/accessories-power/jc32-2in1-selfie-stick.png',
  price: 85.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    type: '2-in-1 Selfie Stick',
    features: 'Dual-function design'
  }
},
{
  id: 'rgb-led-soft-ring-light',
  name: 'RGB LED Soft Ring Light',
  image: '/images/Products/accessories-power/rgb-led-soft-ring-light.png',
  price: 160.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    lighting: 'RGB LED, Soft Light',
    use: 'Photography & Streaming'
  }
},
{
  id: 'ym200-rgb-lighting',
  name: 'YM200 RGB Lighting',
  image: '/images/Products/accessories-power/ym200-rgb-lighting.png',
  price: 130.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    lighting: 'RGB LED',
    use: 'Photography & Streaming'
  }
},
{
  id: 'mj18-rgb-led-soft-ring-light',
  name: 'MJ18 RGB LED Soft Ring Light',
  image: '/images/Products/accessories-power/mj18-rgb-led-soft-ring-light.png',
  price: 190.00,
  category: 'selfie-sticks',
  availability: 'In Stock',
  specs: {
    lighting: 'RGB LED, Soft Light',
    use: 'Photography & Streaming'
  }
},

// BATTERY PACKS - New arrivals
{
  id: 'magsafe-battery-pack-5000mah',
  name: 'MagSafe Battery Pack 5000mAh',
  image: '/images/Products/accessories-power/magsafe-battery-pack-5000mah.png',
  price: 90.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '5000mAh',
    charging: 'MagSafe Wireless'
  }
},
{
  id: 'magsafe-battery-pack-10000mah',
  name: 'MagSafe Battery Pack 10000mAh',
  image: '/images/Products/accessories-power/magsafe-battery-pack-10000mah.png',
  price: 130.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '10000mAh',
    charging: 'MagSafe Wireless'
  }
},
{
  id: 'apple-iphone-air-battery-pack',
  name: 'Apple iPhone Air Battery Pack',
  image: '/images/Products/accessories-power/apple-iphone-air-battery-pack.png',
  price: 180.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    type: 'Original Apple Battery Pack',
    compatibility: 'iPhone Air'
  }
},
  ];
"@

$pageAnchorCount = ([regex]::Matches($pageContent, [regex]::Escape($pageAnchor))).Count
if ($pageAnchorCount -ne 1) {
    Write-Host "ERROR: page.tsx anchor matched $pageAnchorCount times (expected 1)." -ForegroundColor Red
    Write-Host "No changes written to page.tsx." -ForegroundColor Yellow
    $idx = $pageContent.IndexOf("memory-card-256gb")
    if ($idx -ge 0) {
        $start = [Math]::Max(0, $idx - 50)
        $len = [Math]::Min(600, $pageContent.Length - $start)
        Write-Host "Text near 'memory-card-256gb' for reference:" -ForegroundColor Yellow
        Write-Host $pageContent.Substring($start, $len)
    } else {
        Write-Host "Could not even find 'memory-card-256gb' in the file - the product list may have changed structure." -ForegroundColor Yellow
    }
    exit 1
}
$pageContent = $pageContent.Replace($pageAnchor, $newProductBlocks)

# ============================================================
# 2) CELLYRULES.TS - insert matching CATALOG entries
# ============================================================
$cellyContent = Get-Content -Path $cellyFile -Raw
$cellyContent = $cellyContent -replace "`r`n", "`n"

$selfieAnchor = "{ n: 'M02 3-Axis Gimbal', p: 320, c: 'selfie' },"
$selfieNew = @"
{ n: 'M02 3-Axis Gimbal', p: 320, c: 'selfie' },
  { n: 'TT22 Mini Selfie Stick', p: 100, c: 'selfie' },
  { n: 'F07 Mini Selfie Stick', p: 80, c: 'selfie' },
  { n: 'JC-32 2-in-1 Selfie Stick', p: 85, c: 'selfie' },
  { n: 'RGB LED Soft Ring Light', p: 160, c: 'selfie' },
  { n: 'YM200 RGB Lighting', p: 130, c: 'selfie' },
  { n: 'MJ18 RGB LED Soft Ring Light', p: 190, c: 'selfie' },
"@

$powerbankAnchor = "{ n: 'Boss Bar Wireless 10000mAh', p: 110, c: 'powerbanks', s: true },"
$powerbankNew = @"
{ n: 'Boss Bar Wireless 10000mAh', p: 110, c: 'powerbanks', s: true },
  { n: 'MagSafe Battery Pack 5000mAh', p: 90, c: 'powerbanks' },
  { n: 'MagSafe Battery Pack 10000mAh', p: 130, c: 'powerbanks' },
  { n: 'Apple iPhone Air Battery Pack', p: 180, c: 'powerbanks' },
"@

$selfieCount    = ([regex]::Matches($cellyContent, [regex]::Escape($selfieAnchor))).Count
$powerbankCount = ([regex]::Matches($cellyContent, [regex]::Escape($powerbankAnchor))).Count

if ($selfieCount -ne 1 -or $powerbankCount -ne 1) {
    Write-Host "ERROR: cellyRules.ts anchors not unique (selfie matches: $selfieCount, powerbanks matches: $powerbankCount)." -ForegroundColor Red
    Write-Host "No changes written to cellyRules.ts." -ForegroundColor Yellow
    exit 1
}

$cellyContent = $cellyContent.Replace($selfieAnchor, $selfieNew)
$cellyContent = $cellyContent.Replace($powerbankAnchor, $powerbankNew)

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
$newIds = @(
    'tt22-mini-selfie-stick', 'f07-mini-selfie-stick', 'jc32-2in1-selfie-stick',
    'rgb-led-soft-ring-light', 'ym200-rgb-lighting', 'mj18-rgb-led-soft-ring-light',
    'magsafe-battery-pack-5000mah', 'magsafe-battery-pack-10000mah', 'apple-iphone-air-battery-pack'
)
$newCatalogNames = @(
    'TT22 Mini Selfie Stick', 'F07 Mini Selfie Stick', 'JC-32 2-in-1 Selfie Stick',
    'RGB LED Soft Ring Light', 'YM200 RGB Lighting', 'MJ18 RGB LED Soft Ring Light',
    'MagSafe Battery Pack 5000mAh', 'MagSafe Battery Pack 10000mAh', 'Apple iPhone Air Battery Pack'
)

$verifyPage  = Get-Content -Path $pageFile -Raw
$verifyCelly = Get-Content -Path $cellyFile -Raw

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
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Reminder: the 9 image files must exist in /public/images/Products/accessories-power/ with the exact filenames given earlier, or the cards will show broken images." -ForegroundColor Yellow

Write-Host ""
Write-Host "Rollback commands if needed:" -ForegroundColor Cyan
Write-Host "Copy-Item `"$pageBackup`" `"$pageFile`" -Force"
Write-Host "Copy-Item `"$cellyBackup`" `"$cellyFile`" -Force"
